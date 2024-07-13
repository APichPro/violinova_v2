import React, { useEffect, useState, useRef } from "react";
import { useSynth } from "@/providers/SynthProvider";

const ProgressComponent = () => {
  const { subscribeToProgress, controlSeek } = useSynth();
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
      controlSeek(newProgress);
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
      className="w-full bg-gray-300 rounded-full h-6 overflow-hidden mt-5 relative"
    >
      <div
        className={`h-full flex items-center justify-center text-white font-bold`}
        style={{ width: `${progress}%` }}
      >
        {`${progress}%`}
        <div
          className="absolute w-10 h-10 rounded-full bg-blue-500 text-center flex items-center justify-center cursor-pointer"
          style={{ left: `calc(${progress}% - 1.25rem)` }}
          onMouseDown={handleMouseDown}
        >
          🚀
        </div>
      </div>
    </div>
  );
};

export default ProgressComponent;
