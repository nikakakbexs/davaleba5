import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const hiddenWord = "hello";
  const [typedText, setTypedText] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [client, setClient] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return;

      const nextCharacter = hiddenWord[typedText.length];

      if (e.key === nextCharacter) {
        const newTypedText = typedText + e.key;
        setTypedText(newTypedText);

        if (newTypedText === hiddenWord) {
          alert("Congratulations! You guessed the hidden word!");
          setGameOver(true);
        }
      }
    };

    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [typedText, hiddenWord, gameOver]);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && time !== 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const handleStartPause = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", (e) => {
      setClient((prev) => ({ ...prev, x: e.clientX, y: e.clientY }));
    });
  });

  return (
    <div className="app">
      <div className="game">
        <h1>Type to reveal the hidden word!</h1>
        <p className="typed-text">{typedText}</p>
        {gameOver && (
          <p className="game-over">Game Over! You guessed the word.</p>
        )}
      </div>

      <div className="timer">
        <h1>Timer: {time} seconds</h1>
        <button onClick={handleStartPause} className="button start-pause">
          {isRunning ? "Pause" : "Start"}
        </button>
        <button onClick={handleReset} className="button reset">
          Reset
        </button>
      </div>

      <div className="coordinates">
        <h1>X: {client.x}</h1>
        <h1>Y: {client.y}</h1>
      </div>
    </div>
  );
}

export default App;
