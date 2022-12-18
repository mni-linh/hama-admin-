import React, { useRef, useState } from "react";

import "./dropdown.css";

const handleClickOutside = (toggleRef, dropdownRef, show, setShow) => {
  let isShow = show;
  document.addEventListener("mousedown", (e) => {
    if (isShow) {
      if (
        toggleRef.current &&
        !toggleRef.current.contains(e.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setShow(false);
        isShow = false;
      }

      if (toggleRef.current && toggleRef.current.contains(e.target)) {
        setShow(false);
        isShow = false;
      }
    } else if (
      !isShow &&
      toggleRef.current &&
      toggleRef.current.contains(e.target)
    ) {
      setShow(true);
      isShow = true;
    }
  });
};

const Dropdown = (props) => {
  const [show, setShow] = useState(false);
  const toggleRef = useRef(null);
  const dropdownRef = useRef(null);

  handleClickOutside(toggleRef, dropdownRef, show, setShow);

  return (
    <div className="dropdown">
      <div ref={toggleRef} className="dropdown__toggle">
        {props.icon ? <i className={props.icon}></i> : ""}
        {props.badge ? (
          <span className="dropdown__toggle-badge">{props.badge}</span>
        ) : (
          ""
        )}
        {props.customToggle ? props.customToggle() : ""}
      </div>
      <div
        ref={dropdownRef}
        className={"dropdown__content" + (show ? " active" : "")}
      >
        {props.contentData && props.renderItems
          ? props.contentData.map((item, index) =>
              props.renderItems(item, index)
            )
          : ""}
        {props.renderFooter ? (
          <div className="dropdown__footer">{props.renderFooter()}</div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Dropdown;
