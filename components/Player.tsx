"use client";
import { useRef, useState } from "react";
import { useSynth } from "@/providers/SynthProvider";
import Image from "next/image";
import ProgressBar from "./ProgressBar";

const Player = () => {
  const [bpm, setBpm] = useState<number>(100);

  const { controlWarp, controlPlay, controlRestart } = useSynth();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    controlWarp(bpm);
  };

  const handleInputChange = (e: any) => {
    setBpm(e.target.value);
  };

  return (
    <div className="bottom-0 w-full h-24 bg-pal-1 border-t-pal-2 border-2 flex flex-col item-center">
      <ProgressBar />
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
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            value={bpm}
            onChange={handleInputChange}
            placeholder="bpm"
          />
          <button type="submit">Submit</button>
        </form>
        {/* <button onClick={() => controlWarp(200)}>Test</button> */}
      </div>
      <div id="synthcontrol" />
    </div>
  );
};

export default Player;
