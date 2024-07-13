"use client";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { useSynth } from "@/providers/SynthProvider";
import ProgressBar from "./ProgressBar";
import Link from "next/link";

const Player = () => {
  const [bpm, setBpm] = useState(100);
  const { controlWarp, controlPlay, controlRestart, controlLoop, getPieceId } =
    useSynth();

  const handleChange = (event: { target: { value: any } }) => {
    setBpm(event.target.value);
    controlWarp(bpm);
  };

  return (
    <div className={cn("sticky bottom-0 left-0 flex size-full flex-col", {})}>
      <div id="audio" className="hidden" />
      <ProgressBar />
      <section className="glassmorphism-black flex h-[112px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
        <Link href={`/piece/${getPieceId()}`} className="bg-red-50">
          Test
        </Link>
        <button onClick={controlPlay}>Play</button>
        <button onClick={controlRestart}>Restart</button>
        <button onClick={controlLoop}>Loop</button>
        <input title="bpm" type="number" value={bpm} onChange={handleChange} />
        {/* <button
          onClick={() => getSynthControl().seek(4, "seconds")}
        >
          Test
        </button> */}
      </section>
    </div>
  );
};

export default Player;
