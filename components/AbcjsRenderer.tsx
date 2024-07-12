"use client";
import React, { useEffect, useRef } from "react";
import { useSynth } from "@/providers/SynthProvider";

const AbcjsRenderer = ({ abc }: { abc: string }) => {
  const ref = useRef(null);
  const { getSynth, initSynth, initVisual } = useSynth();

  useEffect(() => {
    initVisual(abc, ref);
    getSynth() ? null : initSynth();
  }, [abc]);

  return (
    <div className="bg-white-1 flex flex-col">
      <div ref={ref}></div>
    </div>
  );
};

export default AbcjsRenderer;
