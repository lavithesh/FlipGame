import { useEffect, useMemo, useRef, useState } from "react";
import Confetti from "react-confetti";
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
  const timeout = useRef();
  const isGameCompleted = useMemo(() => {
    if (pices.length > 0 && pices.every((pice) => pice.solved)) {
      return true;
    }
    return false;
  }, [pices]);

  const start = () => {
    const duplicateArray = [...icons, ...icons];
    let newArray = [];

    while (newArray.length < icons.length * 2) {
      const newIndex = Math.floor(Math.random() * duplicateArray.length);
      newArray.push({
        emoji: duplicateArray[newIndex],
        flipped: false,
        solved: false,
        position: newArray.length,
      });
      duplicateArray.splice(newIndex, 1);
    }
    setPices(newArray);
  };
  useEffect(() => {
    start();
  }, []);
  const handelActive = (data) => {
    const flippedData = pices.filter((data) => data.flipped && !data.solved);
    if (flippedData.length === 2) return;

    const newPices = pices.map((pice) => {
      if (pice.position === data.position) {
        pice.flipped = !pice.flipped;
      }
      return pice;
    });
    setPices(newPices);
  };

  const gameLogicForFlipped = () => {
    const flippedData = pices.filter((data) => data.flipped && !data.solved);
    if (flippedData.length === 2) {
      timeout.current = setTimeout(() => {
        if (flippedData[0].emoji === flippedData[1].emoji) {
          setPices(
            pices.map((pice) => {
              if (
                pice.position === flippedData[0].position ||
                pice.position === flippedData[1].position
              ) {
                pice.solved = true;
              }
              return pice;
            })
          );
        } else {
          setPices(
            pices.map((pice) => {
              if (
                pice.position === flippedData[0].position ||
                pice.position === flippedData[1].position
              ) {
                pice.flipped = false;
              }
              return pice;
            })
          );
        }
      }, 800);
    }
  };
  useEffect(() => {
    gameLogicForFlipped();
    return () => {
      clearTimeout(timeout.current);
    };
  }, [pices]);
  return (
    <>
      <h1>Welcome to Flip Game</h1>
      <div className="container">
        {pices.map((data, index) => {
          return (
            <div
              className={`flip-card ${
                data.flipped || data.solved ? "active" : ""
              }`}
              key={index}
              onClick={() => handelActive(data)}
            >
              <div className="flip-card-inner">
                <div className="flip-card-front"></div>
                <div className="flip-card-back">{data.emoji}</div>
              </div>
            </div>
          );
        })}
      </div>
      {isGameCompleted && (
        <div className="game-completed">
          <h1>YOU WIN!!!</h1>{" "}
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        </div>
      )}
    </>
  );
}

export default App;
