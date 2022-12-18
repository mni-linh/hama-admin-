import React, { useEffect } from "react";
import { Alert } from "@themesberg/react-bootstrap";
import "./Alert.css";

const AlertCustom = ({ show, setShow, title, variant }) => {

  const handleClose = () => {
    setTimeout(() => {
      setShow(false);
    }, 5000);
  };

  useEffect(() => {
    if (show) {
      handleClose();
    }
  });
  return (
    <Alert
      className="alert-custom"
      show={show}
      variant={variant}
      onClose={() => setShow(false)}
      dismissible
    >
      {title}
    </Alert>
  );
};

export default AlertCustom;
