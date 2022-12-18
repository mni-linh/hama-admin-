import React from "react";
import { Modal, Button } from "@themesberg/react-bootstrap";

const ModalConfirm = ({ title, description, onSure, show, setShow }) => {
  const handleClose = () => setShow(false);
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{description}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={onSure}>
          Ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalConfirm;
