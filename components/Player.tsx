"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { SynthProvider } from "@/providers/SynthProvider";

const Player = () => {
  const [bpm, setBpm] = useState(100);

  const handleChange = (event: { target: { value: any } }) => {
    setBpm(event.target.value);
    SynthProvider.getSynthControl().setWarp(bpm);
  };

  return (
    <div
      className={cn("sticky bottom-0 left-0 flex size-full flex-col", {
        // hidden: !audio?.audioUrl || audio?.audioUrl === "",
      })}
    >
      <div id="audio"></div>
      <section className="glassmorphism-black flex h-[112px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
        <button onClick={() => SynthProvider.getSynthControl().play()}>
          Play
        </button>
        <button onClick={() => SynthProvider.getSynthControl().restart()}>
          Restart
        </button>
        <button onClick={() => SynthProvider.getSynthControl().toggleLoop}>
          Loop
        </button>
        <input type="number" value={bpm} onChange={handleChange} />
      </section>
    </div>
  );
};

export default Player;
