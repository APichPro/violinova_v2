// src/Metronome.js
import React, { useState, useEffect } from "react";

const Metronome = () => {
  const [bpm, setBpm] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const tickSound = new Audio("/tick.mp3"); // Ensure the sound file is in the public folder

  useEffect(() => {
    if (isRunning) {
      const intervalTime = (60 / bpm) * 1000;

      const id = setInterval(() => {
        tickSound.currentTime = 0; // Reset to the beginning
        tickSound.play(); // Play the tick sound
      }, intervalTime);

      return () => clearInterval(id);
    }
  }, [isRunning, bpm]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleBpmChange = (e) => {
    setBpm(Number(e.target.value));
  };

  const swingDuration = `${60 / bpm}s`;

  return (
    <div className="flex flex-col items-center mt-10">
      <h1 className="text-2xl font-bold mb-4">Metronome</h1>
      <div
        className={`metronome-bar ${isRunning ? "swing" : ""}`}
        style={{ animationDuration: swingDuration }}
      >
        <div className="w-2 h-24 bg-blue-500" />
      </div>
      <input
        title="bpm"
        type="number"
        value={bpm}
        onChange={handleBpmChange}
        min="40"
        max="240"
        className="mt-4 p-2 border border-gray-300 rounded w-24 text-center"
      />
      <button
        onClick={handleStartStop}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-200"
      >
        {isRunning ? "Stop" : "Start"}
      </button>
    </div>
  );
};

export default Metronome;
