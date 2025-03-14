import React from "react";
import "./CookieClicker.css"; // Import the CSS file

const KfcIcon = ({ id, x, y, src }) => {
  return (
    <img
      key={id}
      src={src}
      alt="Falling Item"
      className="kfc"
      style={{ left: x, top: y, zIndex: 0 }}
    />
  );
};

export default KfcIcon;
