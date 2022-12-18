import React from "react";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const Logout = () => {
  const [, , removeCookie] = useCookies(["token"]);

  const handleLogout = () => {
    removeCookie("token");
    window.location.pathname = "/";
  };

  useEffect(() => {
    handleLogout();
  });

  return <div></div>;
};

export default Logout;
