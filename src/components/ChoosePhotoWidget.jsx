import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Card, Image } from "@themesberg/react-bootstrap";

const ChoosePhotoWidget = (props) => {
  const { title, photo } = props;
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">{title}</h5>
        <div className="d-xl-flex align-items-center">
          <div className="user-avatar xl-avatar">
            <Image fluid rounded src={photo} />
          </div>
          <div className="file-field">
            <div className="d-flex justify-content-xl-center ms-xl-3">
              <div className="d-flex">
                <span className="icon icon-md">
                  <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                </span>
                <br />
                <input type="file" />
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ChoosePhotoWidget;
