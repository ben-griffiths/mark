import React from "react";

const ModeSwitchButton = ({ icon, onClick }) => {
  return (
    <button
      className="fixed bottom-4 right-4"
      style={{ zIndex: 2 }}
      onClick={onClick}
    >
      <img
        src={icon}
        alt="Mode Switch"
        style={{ width: "100px", height: "100px", zIndex: 2 }}
      />
    </button>
  );
};

export default ModeSwitchButton;
