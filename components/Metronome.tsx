// src/Metronome.js
import React, { useState, useEffect } from "react";

const Metronome = () => {
  const [bpm, setBpm] = useState(120);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const tickSound = new Audio("/tick.mp3");

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

  const handleBpmChange = (e: { target: { value: any } }) => {
    setBpm(Number(e.target.value));
  };

  const swingDuration = `${(60 * 2) / bpm}s`;

  return (
    <div className="flex flex-col items-center mt-10">
      <div
        className={`metronome-bar flex absolute justify-center align-bottom ${isRunning ? "swing" : ""}`}
        style={{ animationDuration: swingDuration }}
      >
        <div className="w-4 h-4 bg-black-1 rounded-full absolute top-[-8px] left-1/2 transform -translate-x-1/2" />

        <div className="w-1 h-24 bg-black-1 rounded-full" />
      </div>
      <svg className="h-32" version="1.1" id="Icons" viewBox="0 0 32 32">
        <path
          fill="none"
          stroke="black"
          d="M22.7,16 l2.5,9.7 c0.4,1.7-0.8,3.3-2.6,3.3 H9.3 c-1.7,0-3-1.6-2.6-3.2 l4.7-20.5 C11.8,3.9,13,3,14.3,3 h3.4 c1.4,0,2.5,0.1,3.8,7 l1.45,7"
        />
      </svg>

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
