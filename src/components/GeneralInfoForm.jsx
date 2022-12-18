import React, { useState, useRef } from "react";
import { Col, Row, Card, Form, Button } from "@themesberg/react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ModalConfirm from "./modal-confirm/ModalConfirm";
import AlertCustom from "./alert-custom/Alert";

const GeneralInfoForm = ({
  name,
  email,
  file,
  token,
  setCookie,
  removeCookie,
}) => {
  const DOMAIN = "https://hama-be.vercel.app/";
  // const DOMAIN = "https://hama-be-git-dev-minh0812.vercel.app/";

  const location = useLocation();
  const path = location.pathname;

  const [userName, setUserName] = useState(name);
  const [userEmail, setUserEmail] = useState(email);
  const [userPassword, setUserPassword] = useState("");
  const [userConfirmPassword, setUserConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const URLAvatar = useRef("");
  const [showModal, setShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [titleAlert, setTitleAlert] = useState("");
  const [variantAlert, setVariantAlert] = useState("");

  const dataModal = {
    title: "Delete Account",
    description:
      "Hành động này không thể hoàn tác!!! Bạn có chắc chắn muốn xóa tài khoản này không?",
  };

  const handleUploadAvatar = async () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", Date.now() + file.name);
    await axios({
      method: "POST",
      url: "https://api.imgbb.com/1/upload?key=55b682fb2235adc9beb9aa845a4f08de",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        URLAvatar.current = res.data.data.display_url;
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleUpdateInFo = async () => {
    setLoading(true);
    if (file) {
      await handleUploadAvatar();
    }

    if (userConfirmPassword) {
      if (userPassword !== userConfirmPassword) {
        setShowAlert(true);
        setVariantAlert("danger");
        setTitleAlert("Password and Confirm Password must be the same !!!");
        return setLoading(false);
      }
      if (userPassword.length < 6) {
        setShowAlert(true);
        setVariantAlert("danger");
        setTitleAlert("Password must be at least 6 characters !!!");
        return setLoading(false);
      }
    }
    await axios
      .put(
        `${DOMAIN}api/admin/me`,
        {
          email: userEmail,
          name: userName,
          password: userConfirmPassword,
          avatar: URLAvatar.current,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setLoading(false);
        setCookie("token", res.data.access_token, { path: "/" });
        setShowAlert(true);
        setVariantAlert("success");
        setTitleAlert("Update successfully !!!");
        setTimeout(() => {
          window.location.pathname = "/";
        }, 1000);
      })
      .catch((err) => {
        setShowAlert(true);
        setVariantAlert("danger");
        setTitleAlert("Update failed: " + err.response.data.detail);
        console.log("err", err);
        setLoading(false);
      });
  };

  const handleSignUp = async () => {
    setLoading(true);
    if (file) {
      await handleUploadAvatar();
    }

    if (userPassword !== userConfirmPassword) {
      setShowAlert(true);
      setVariantAlert("danger");
      setTitleAlert("Password and Confirm Password must be the same !!!");
      return setLoading(false);
    }

    await axios
      .post(
        `${DOMAIN}api/admin`,
        {
          email: userEmail,
          name: userName,
          password: userConfirmPassword,
          avatar: URLAvatar.current,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setLoading(false);
        setShowAlert(true);
        setVariantAlert("success");
        setTitleAlert("Sign up successfully !!!");
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
        setShowAlert(true);
        setVariantAlert("danger");
        setTitleAlert("Sign up failed: " + err.response.data.detail);
      });
  };

  const handleDeleteAccount = async () => {
    setLoading(true);
    await axios
      .delete(`${DOMAIN}api/admin/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        removeCookie("token");
        setLoading(false);
        setShowAlert(true);
        setVariantAlert("success");
        setTitleAlert("Delete account successfully !!!");
        window.location.pathname = "/";
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
        setShowAlert(true);
        setVariantAlert("danger");
        setTitleAlert("Delete failed: " + err.response.data.detail);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    path === "/signup" ? handleSignUp() : handleUpdateInFo();
  };

  return (
    <>
      <h2 className="page-header">
        {path === "/signup" ? "Thêm thành viên mới" : "Thông tin cá nhân"}
      </h2>
      <Card border="light" className="shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Thông tin chung</h5>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="yourName">
                  <Form.Label>Tên</Form.Label>
                  <Form.Control
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    type="text"
                    placeholder="Nhập tên vào đây..."
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="emal">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    required
                    type="email"
                    placeholder="Nhập email vào đây..."
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="password">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    required={path === "/signup"}
                    type="password"
                    onChange={(e) => setUserPassword(e.target.value)}
                    value={userPassword}
                    placeholder="Nhập mật khẩu..."
                    autoComplete="on"
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="repassword">
                  <Form.Label>Nhập lại mật khẩu</Form.Label>
                  <Form.Control
                    required={path === "/signup"}
                    type="password"
                    onChange={(e) => setUserConfirmPassword(e.target.value)}
                    value={userConfirmPassword}
                    placeholder="Nhập lại mật khẩu..."
                    autoComplete="on"
                  />
                </Form.Group>
              </Col>
            </Row>
            <div className="mt-3" style={{ float: "right" }}>
              {path === "/profile" && (
                <Button
                  variant="danger"
                  disabled={loading}
                  className="mr-2"
                  onClick={() => setShowModal(true)}
                >
                  Xóa tài khoản
                </Button>
              )}

              <Button variant="primary" type="submit" disabled={loading}>
                {loading
                  ? "Đang cập nhật..."
                  : path === "/signup"
                  ? "Thêm thành viên"
                  : "Cập nhật"}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <ModalConfirm
        title={dataModal.title}
        description={dataModal.description}
        show={showModal}
        setShow={setShowModal}
        onSure={() => handleDeleteAccount()}
      />
      <AlertCustom
        variant={variantAlert}
        show={showAlert}
        setShow={setShowAlert}
        title={titleAlert}
      />
    </>
  );
};

export default GeneralInfoForm;
