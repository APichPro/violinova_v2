"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

const Player = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <div
      className={cn("sticky bottom-0 left-0 flex size-full flex-col", {
        // hidden: !audio?.audioUrl || audio?.audioUrl === "",
      })}
    >
      <div id="audio"></div>
      <section className="glassmorphism-black flex h-[112px] w-full items-center justify-between px-4 max-md:justify-center max-md:gap-5 md:px-12">
        
      </section>
    </div>
  );
};

export default Player;
