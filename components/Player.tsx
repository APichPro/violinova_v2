"use client";
import { useRef, useState } from "react";
import { useSynth } from "@/providers/SynthProvider";
import Image from "next/image";
import Draggable from "react-draggable";

const Player = () => {
  const draggableRef = useRef(null);
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
    // <Draggable nodeRef={draggableRef} defaultPosition={{ x: 0, y: 0 }}>
    <div
      ref={draggableRef}
      className="z-10 glassmorphism-player flex flex-col items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12 top-0 rounded-full absolute"
    >
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
      <div id="audio" className="hidden" />
    </div>

    // </Draggable>
  );
};

export default Player;
