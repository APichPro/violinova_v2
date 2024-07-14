"use client";
import React, {
  createContext,
  MutableRefObject,
  useContext,
  useRef,
  useState,
} from "react";
import {
  MidiBuffer,
  SynthObjectController,
  TuneObject,
  synth,
  renderAbc,
} from "abcjs";

interface SynthContextType {
  initSynth: (pieceId: string) => void;
  controlPlay: () => void;
  getPieceId: () => string;
  controlLoop: () => void;
  controlRestart: () => void;
  controlWarp: (warp: number) => void;
  controlSeek: (beats: number) => void;
  getProgress: () => number;
  getTotalTime: () => number;
  getSynth: () => MidiBuffer;
  initVisual: (abc: string, ref: any) => void;
  subscribeToProgress: (callback: (progress: number) => void) => void;
}

const SynthContext = createContext<SynthContextType | null>(null);

export const useSynth = () => {
  const context = useContext(SynthContext);
  if (!context) {
    throw new Error("useSynth must be used within a SynthProvider");
  }
  return context;
};

export const SynthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const synthetizer = useRef<MidiBuffer | null>(null);
  const synthControl = useRef<SynthObjectController | null>(null);
  const visualObject = useRef<TuneObject | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const progressListeners = useRef<Function[]>([]);
  const [pieceId, setPieceId] = useState<string>();

  const initVisual = (abc: string, ref: any) => {
    visualObject.current = renderAbc(ref.current, abc, {
      add_classes: true,
      responsive: "resize",
      clickListener: (e: any) => {
        synthControl.current?.seek(
          e.currentTrackMilliseconds[0] / 1000,
          "seconds"
        );
      },
    })[0];
  };

  const initSynth = (pieceId: string) => {
    setPieceId(pieceId);
    synthetizer.current = new synth.CreateSynth();
    synthControl.current = new synth.SynthController();

    synthControl.current.load("#audio", {
      onEvent: (event: any) => {
        const all = document.querySelectorAll(".abcjs-note,.abcjs-rest");
        Array.from(all).forEach(
          (note) => ((note as HTMLElement).style.fill = "black")
        );
        event.elements![0][0].style.fill = "#F97535";

        const rect = event.elements![0][0].getBoundingClientRect();
        const isVisible =
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <=
            (window.innerWidth || document.documentElement.clientWidth);

        if (!isVisible) {
          event.elements![0][0].scrollIntoView({
            block: "center",
            inline: "center",
            behavior: "smooth",
          });
        }
      },
      onBeat: (beatNumber, totalBeats) => {
        setProgress((beatNumber / totalBeats) * 100);
        notifyProgressListeners((beatNumber / totalBeats) * 100);
      },
    });

    synthetizer.current
      .init({
        visualObj: visualObject.current!,
      })
      .then(() => {
        synthControl.current!.setTune(visualObject.current!, true, {
          soundFontVolumeMultiplier: 1,
          // qpm: 120,
          // defaultQpm: 120,
        });
      });
  };

  const getPieceId = () => {
    return pieceId!;
  };

  const getSynth = () => {
    return synthetizer.current!;
  };

  const controlPlay = () => {
    return synthControl.current!.play();
  };

  const controlLoop = () => {
    synthControl.current!.toggleLoop();
  };

  const controlRestart = () => {
    synthControl.current!.restart();
  };

  const controlWarp = (warp: number) => {
    synthControl.current!.setWarp(warp);
  };

  const controlSeek = (seek: number) => {
    synthControl.current!.seek(seek, "seconds");
  };

  const getProgress = () => {
    return progress;
  };

  const getTotalTime = () => {
    return visualObject.current?.getTotalTime();
  };

  const subscribeToProgress = (callback: (progress: number) => void) => {
    progressListeners.current.push(callback);
  };

  const notifyProgressListeners = (newProgress: number) => {
    progressListeners.current.forEach((callback) => callback(newProgress));
  };

  return (
    <SynthContext.Provider
      value={{
        initSynth,
        getProgress,
        subscribeToProgress,
        getSynth,
        initVisual,
        controlPlay,
        controlLoop,
        controlRestart,
        controlWarp,
        getPieceId,
        controlSeek,
        getTotalTime,
      }}
    >
      {children}
    </SynthContext.Provider>
  );
};
