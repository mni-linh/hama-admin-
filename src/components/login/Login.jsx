import React, { useRef, useState } from "react";
import { Button } from "@themesberg/react-bootstrap";
import AlertCustom from "../alert-custom/Alert";
import { useCookies } from "react-cookie";
import axios from "axios";

import "./login.css";
const Login = () => {
  const username = useRef("");
  const password = useRef("");
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [, setCookie] = useCookies(["token"]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = username?.current?.value;
    const pass = password?.current?.value;
    await axios
      .post(
        "https://hama-be.vercel.app/api/admin/token",
        {
          grant_type: "",
          username: user,
          password: pass,
          scope: "",
          client_id: "",
          client_secret: "",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        setCookie("token", res?.data?.access_token, { path: "/" });
        window.location.reload();
      })
      .catch((err) => {
        setError(err?.response?.data?.detail);
        setShow(true);
        return console.log("err", err);
      });
    setLoading(false);
  };
  return (
    <div className="login">
      <div className="row">
        <div className="col-lg-4 col-md-2"></div>
        <div className="col-lg-4 col-md-8 login-box">
          <AlertCustom
            variant="danger"
            title={error}
            show={show}
            setShow={setShow}
          />
          <div className="col-lg-12 login-title">ĐĂNG NHẬP</div>
          <div className="col-lg-12 login-form">
            <div className="col-lg-12 login-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-control-label">USERNAME</label>
                  <input
                    ref={username}
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-control-label">PASSWORD</label>
                  <input
                    ref={password}
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    autoComplete="on"
                    required
                  />
                </div>

                <div className="col-lg-12">
                  <Button
                    type="submit"
                    className="btn-login"
                    variant="outline-primary"
                    disabled={loading}
                  >
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </Button>
                  &nbsp;
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
