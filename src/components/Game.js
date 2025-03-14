import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import FallingItem from "./FallingItem";
import "./Game.css"; // Import the CSS file
import ModeSwitchButton from "./ModeSwitchButton";

const Game = () => {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([]);
  const [gameMode, setGameMode] = useState("default");
  const [flip, setFlip] = useState(false);

  const gameModes = {
    default: {
      background: `${process.env.PUBLIC_URL}/background.png`,
      characterImage: (count) =>
        `${process.env.PUBLIC_URL}/mark${Math.min(
          Math.floor(count / 20) + 1,
          5
        )}.png`,
      fallingItem: `${process.env.PUBLIC_URL}/kfc.png`,
      title: "Feed Mark KFC",
      speechBubble: "",
      piecesText: "Pieces",
      buttonIcon: `${process.env.PUBLIC_URL}/halal.png`,
      buttonAction: () => setGameMode("halal"),
    },
    halal: {
      background: `${process.env.PUBLIC_URL}/halal_background.png`,
      characterImage: () =>
        `${process.env.PUBLIC_URL}/javed${flip ? "-flipped" : ""}.png`,
      fallingItem: `${process.env.PUBLIC_URL}/doner.png`,
      characterStyle: {
        width: "200px",
        height: "400px",
      },
      title: "Feed Javed Doner Meat and Chips",
      speechBubble: "I can't, it's Ramadan",
      piecesText: "Kebabs Dodged",
      buttonIcon: `${process.env.PUBLIC_URL}/kfc.png`,
      buttonAction: () => setGameMode("default"),
    },
  };

  const handleClick = () => {
    setCount(count + 1);
    setItems([
      ...items,
      {
        id: Date.now(),
        x: Math.random() * (window.innerWidth - 50),
        y: -50 - Math.random() * 25,
      },
    ]);
    setFlip(!flip);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((items) =>
        items
          .map((item) => ({ ...item, y: item.y + 50 }))
          .filter((item) => item.y < window.innerHeight)
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const currentMode = gameModes[gameMode];

  return (
    <div
      className="flex flex-col items-center justify-center h-dvh bg-gray-100 overflow-hidden"
      style={{
        backgroundImage: `url(${currentMode.background})`,
        backgroundSize: "cover",
        padding: "20px",
      }}
    >
      {items.map((item) => (
        <FallingItem
          key={item.id}
          id={item.id}
          x={item.x}
          y={item.y}
          src={currentMode.fallingItem}
        />
      ))}
      <h1
        className="text-5xl font-bold mb-8"
        style={{
          color: "#FFFFFF",
          textShadow: "4px 4px 0 #000000", // Increased shadow
          zIndex: 1,
        }}
      >
        {currentMode.title}
      </h1>
      <div className="relative">
        <motion.img
          src={currentMode.characterImage(count)}
          alt="Feed Me!"
          className="cursor-pointer"
          style={{
            width: `${256 + count * 2}px`,
            height: `${256 + count * 2}px`,
            zIndex: 1,
            ...(currentMode.characterStyle || {}),
          }}
          onClick={handleClick}
          whileTap={{ scale: 0.9 }}
        />
        {currentMode.speechBubble && items.length > 0 && (
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow"
            style={{ zIndex: 2 }}
          >
            {currentMode.speechBubble}
          </div>
        )}
      </div>
      <p
        className="text-3xl mt-8"
        style={{
          color: "#FFFFFF",
          textShadow: "4px 4px 0 #000000", // Increased shadow
          zIndex: 1,
        }}
      >
        {currentMode.piecesText}: {count}
      </p>
      <ModeSwitchButton
        icon={currentMode.buttonIcon}
        onClick={currentMode.buttonAction}
      />
    </div>
  );
};

export default Game;
