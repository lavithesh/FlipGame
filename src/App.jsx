import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const icons = [
    "🫥",
    "👻",
    "🤹🏼",
    "🧘🏼‍♀️",
    "🪭",
    "🧣",
    "👟",
    "🦉",
    "🦋",
    "🐍",
    "🍀",
    "🍕",
  ];
  const [pices, setPices] = useState([]);

  const start = () => {
    const duplicateArray = [...icons, ...icons];
    let newArray = [];

    while (newArray.length < icons.length * 2) {
      const newIndex = Math.floor(Math.random() * duplicateArray.length);
      newArray.push({
        emoji: duplicateArray[newIndex],
        flipped: false,
        solved: false,
        position: newIndex.length,
      });
      duplicateArray.splice(newIndex, 1);
    }
    setPices(newArray);
  };
  useEffect(() => {
    start();
  }, []);

  return (
    <>
      <h1>Welcome to Flip Game</h1>
      <div className="container">
        {pices.map((data, index) => {
          return (
            <div className="flip-card" key={index}>
              <div className="flip-card-inner">
                <div className="flip-card-front"></div>
                <div className="flip-card-back">{data.emoji}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
