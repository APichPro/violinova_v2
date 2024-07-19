"use client";
import React, { useEffect, useState, useRef } from "react";
import { useSynth } from "@/providers/SynthProvider";

const ProgressBar = () => {
  const { subscribeToProgress, controlSeek, getTotalTime } = useSynth();
  const [progress, setProgress] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleProgressUpdate = (newProgress: number) => {
      if (!isDragging) {
        setProgress(newProgress);
      }
    };

    subscribeToProgress(handleProgressUpdate);
  }, [subscribeToProgress, isDragging]);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const newProgress = Math.min(
        100,
        Math.max(0, ((e.clientX - rect.left) / rect.width) * 100)
      );
      controlSeek((newProgress * getTotalTime()) / 100);
      setProgress(newProgress);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (progressBarRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const newProgress = Math.min(
        100,
        Math.max(0, ((e.clientX - rect.left) / rect.width) * 100)
      );
      controlSeek((newProgress * getTotalTime()) / 100);
      setProgress(newProgress);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={progressBarRef}
      className="bg-orange-2 h-2 w-1/2 mx-auto rounded-b-lg relative"
      onClick={handleClick}
    >
      {/* <h1 className="absolute w-full text-center">{`${progress} / ${Math.floor(
        getTotalTime() / 60
      )
        .toString()
        .padStart(
          2,
          "0"
        )}:${(getTotalTime() % 60).toFixed(0).padStart(2, "0")}`}</h1> */}
      <div
        className={`h-full bg-orange-2 flex items-center text-white font-bold rounded-r-full`}
        style={{ width: `${progress}%` }}
      >
        <div
          className=" h-full absolute z-10 w-8 rounded-full bg-orange-1 text-center flex items-center justify-center cursor-pointer hover:h-8"
          style={{ left: `calc(${progress}% - 1.25rem)` }}
          onMouseDown={handleMouseDown}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
