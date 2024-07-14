"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useSynth } from "@/providers/SynthProvider";
import ProgressBar from "./ProgressBar";
import Link from "next/link";
import { PiPlayThin } from "react-icons/pi";
import { PiSkipBackThin } from "react-icons/pi";
import { RxLoop } from "react-icons/rx";
import Image from "next/image";

const Player = () => {
  const [bpm, setBpm] = useState(100);
  const { controlWarp, controlPlay, controlRestart, controlLoop, getPieceId } =
    useSynth();

  const handleChange = (event: { target: { value: any } }) => {
    setBpm(event.target.value);
    controlWarp(bpm);
  };

  return (
    <div className={cn("sticky bottom-0 left-0 flex flex-col", {})}>
      <div id="audio" className="hidden" />
      <ProgressBar />
      <section className="glassmorphism-player flex h-[112px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
        {/* <Link href={`/piece/${getPieceId()}`} className="bg-red-50">
          Test
        </Link> */}
        <div className="flex gap-4 w-full justify-center">
          <Image
            src="/icons/reverse.svg"
            alt="play"
            width={40}
            height={40}
            onClick={controlRestart}
            className="cursor-pointer"
          />
          <Image
            src="/icons/randomPlay.svg"
            alt="play"
            width={40}
            height={40}
            onClick={controlPlay}
            className="cursor-pointer"
          />
          <Image
            src="/icons/forward.svg"
            alt="play"
            width={40}
            height={40}
            onClick={controlLoop}
            className="cursor-pointer"
          />
        </div>
        {/* <input title="bpm" type="number" value={bpm} onChange={handleChange} /> */}
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
