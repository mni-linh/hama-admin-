import React, { useEffect, useState } from "react";

import "./topnav.css";

import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

import Dropdown from "../dropdown/Dropdown";

import ThemeMenu from "../thememenu/ThemeMenu";

import DefaultAvatar from "../../assets/images/Default Avatar.jpg";

import notifications from "../../assets/JsonData/notification.json";

import user_menu from "../../assets/JsonData/user_menus.json";

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item?.icon}></i>
    <span>{item?.content}</span>
  </div>
);

const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img
        src={user?.avatar || DefaultAvatar}
        alt={user?.name}
      />
    </div>
    <div className="topnav__right-user__name">{user?.name}</div>
  </div>
);

const renderUserMenu = (item, index) => (
  <Link to={item.route} key={index} className="notification-item">
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </Link>
);

const Topnav = () => {
  const DOMAIN = "https://hama-be.vercel.app/";
  // const DOMAIN = "https://hama-be-git-dev-minh0812.vercel.app/";
  const [cookies] = useCookies(["token"]);
  const token = cookies.token;

  const [user, setUser] = useState({});

  const handleGetUser = async () => {
    const response = await axios
      .get(`${DOMAIN}api/admin/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((err) => {
        console.log("err", err.response.data);
      });
    setUser(response?.data);
  };

  useEffect(() => {
    handleGetUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="topnav">
      <div className="topnav__search"></div>
      <div className="topnav__right">

        <div className="topnav__right-item">
          <Dropdown
            customToggle={() => renderUserToggle(user)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        <div className="topnav__right-item">
          <Dropdown
            icon="bx bx-bell"
            badge="12"
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to="/">View All</Link>}
          />
        </div>
        <div className="topnav__right-item">
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
