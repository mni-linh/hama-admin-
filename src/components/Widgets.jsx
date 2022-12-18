import React, { useState } from "react";
import { Card } from "@themesberg/react-bootstrap";

import DefaultAvatar from "../assets/images/Default Avatar.jpg";

export const ProfileCardWidget = ({ name, avatar, setFile }) => {
  const [image, setImage] = useState(avatar);

  const handleSelectImage = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  return (
    <Card
      border="light"
      className="text-center"
      style={{ marginTop: "0px", top: "80px" }}
    >
      <Card.Body style={{}}>
        <Card.Title>Preview Avatar</Card.Title>
        <Card.Img
          src={image || DefaultAvatar}
          alt="Avatar Admin"
          className="user-avatar large-avatar rounded-circle mx-auto mt-n5 mb-2"
          style={{ height: "133px", width: "133px" }}
        />
        <Card.Text className="text-muted mb-3">{name}</Card.Text>
        <div>
          <div className="d-flex justify-content-xl-center ">
            <div className="d-flex"></div>
            <input
              type="file"
              id="file"
              accept="image/*"
              onChange={handleSelectImage}
              style={{ display: "none" }}
            />
            <label htmlFor="file" className="btn btn-outline-primary">
              Chọn ảnh
            </label>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
