import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Col, Row } from "@themesberg/react-bootstrap";

import GeneralInfoForm from "../components/GeneralInfoForm";
import { ProfileCardWidget } from "../components/Widgets";

const EditProfile = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [user, setUser] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = cookies.token;

  const handleGetUser = async () => {
    const response = await axios
      .get("https://hama-be.vercel.app/api/admin/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log("err", err);
      });
    setUser(response?.data);
    setLoading(false);
  };

  useEffect(() => {
    handleGetUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return loading ? (
    <div>
      <p>Loading...</p>
    </div>
  ) : (
    <div>
      <Row style={{}}>
        <Col xs={8} sl={8}>
          <GeneralInfoForm
            name={user?.name}
            email={user?.email}
            file={file}
            token={token}
            setCookie={setCookie}
            removeCookie={removeCookie}
          />
        </Col>

        <Col xs={4} xl={4}>
          <Row>
            <Col xs={11}>
              <ProfileCardWidget
                name={user?.name}
                avatar={user?.avatar}
                setFile={setFile}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
export default EditProfile;
