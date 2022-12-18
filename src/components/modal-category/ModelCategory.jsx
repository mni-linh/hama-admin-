import React, { useState, useRef } from "react";
import { Modal, Form } from "@themesberg/react-bootstrap";

import axios from "axios";

const ModelCategory = ({
  token,
  show,
  setShow,
  dataModal,
  setDataModal,
  categories,
  setCategories,
}) => {
  const DOMAIN = "https://hama-be.vercel.app/";
  // const DOMAIN_DEV = "https://hama-be-git-dev-minh0812.vercel.app/";

  const imageURL = useRef("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelectImage = (e) => {
    if (e?.target?.files[0]) {
      setFile(e?.target?.files[0]);
      imageURL.current = URL.createObjectURL(e.target.files[0]);
    }
  };

  const handleUploadImage = async () => {
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
        imageURL.current = res?.data?.data?.display_url;
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleCreateCategory = async () => {
    setLoading(true);
    if (file) {
      await handleUploadImage();
    }
    await axios
      .post(
        `${DOMAIN}api/categories`,
        {
          name: dataModal?.name,
          image_review: imageURL.current,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res);
        setCategories([...categories, res.data]);
        setLoading(false);
        setShow(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  const handleUpdateCategory = async () => {
    setLoading(true);
    if (file) {
      await handleUploadImage();
    }
    await axios
      .put(
        `${DOMAIN}api/categories/${dataModal.id}`,
        {
          name: dataModal.name,
          image_review: imageURL.current,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        const newCategories = categories.map((category) => {
          if (category.id === dataModal.id) {
            return res.data;
          }
          return category;
        });
        setCategories(newCategories);
        setLoading(false);
        setShow(false);
      })
      .catch((err) => {
        console.log("err", err);
        setLoading(false);
      });
  };

  const handleClickOk = () => {
    if (dataModal.id) {
      handleUpdateCategory();
    } else {
      handleCreateCategory();
    }
  };

  const handleClose = () => {
    setShow(false);
    setDataModal({});
    setFile(null);
    imageURL.current = "";
  };

  return (
    <div>
      <Modal show={show} onHide={() => handleClose()}>
        <Modal.Header closeButton>
          <Modal.Title>Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group id="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={dataModal.name}
                onChange={(e) =>
                  setDataModal({ ...dataModal, name: e.target.value })
                }
                type="text"
                placeholder="Enter title category"
              />
            </Form.Group>
            {(imageURL.current || dataModal?.image_review) && (
              <img
                src={imageURL.current || dataModal?.image_review}
                alt="Preview Category"
                style={{
                  width: "150px",
                  height: "230px",
                  objectFit: "cover",
                  margin: "10px 30%",
                }}
              />
            )}
            <Form.Group id="image">
              <Form.Label>Image Preview</Form.Label>
              <Form.Control onChange={handleSelectImage} type="file" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-danger"
            data-bs-dismiss="modal"
            disabled={loading}
            onClick={() => handleClose()}
          >
            {loading ? "Đang xử lý..." : "Đóng"}
          </button>
          <button
            type="button"
            onClick={() => handleClickOk()}
            disabled={loading}
            className="btn btn-primary"
          >
            {loading
              ? "Đang xử lý..."
              : dataModal?.id
              ? "Cập nhật"
              : "Thêm mới"}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModelCategory;
