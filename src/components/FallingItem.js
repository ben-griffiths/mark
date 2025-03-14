import React from "react";
import "./Game.css"; // Import the CSS file

const FallingItem = ({ id, x, y, src }) => {
  return (
    <img
      key={id}
      src={src}
      alt="Falling Item"
      className="falling-item"
      style={{ left: x, top: y, zIndex: 0 }}
    />
  );
};

export default FallingItem;
