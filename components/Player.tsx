"use client";
import { useState } from "react";
import { useSynth } from "@/providers/SynthProvider";
import Image from "next/image";
import Draggable from "react-draggable";

const Player = () => {
  const [bpm, setBpm] = useState(100);
  const { controlWarp, controlPlay, controlRestart, controlLoop } = useSynth();

  const handleChange = (event: { target: { value: any } }) => {
    setBpm(event.target.value);
    controlWarp(bpm);
  };

  return (
    <Draggable defaultPosition={{ x: 0, y: 0 }}>
      <div className="z-10 glassmorphism-player flex flex-col items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12 top-0 rounded-full absolute">
        <div className="flex gap-4 justify-center">
          <Image
            src="/icons/player-skip-back.svg"
            alt="back"
            width={40}
            height={40}
            onClick={controlRestart}
            className="cursor-pointer"
          />
          <Image
            src="/icons/player-play.svg"
            alt="play"
            width={40}
            height={40}
            onClick={controlPlay}
            className="cursor-pointer"
          />
          <input
            title="bpm"
            type="number"
            value={bpm}
            onChange={handleChange}
          />
        </div>
        <div id="audio" className="hidden" />
      </div>
    </Draggable>
  );
};

export default Player;
