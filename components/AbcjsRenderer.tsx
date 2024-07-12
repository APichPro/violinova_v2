"use client";
import React, { useEffect, useRef } from "react";
import { SynthProvider } from "@/providers/SynthProvider";

const AbcjsRenderer = ({ abc }: { abc: string }) => {
  const ref = useRef(null);

  useEffect(() => {
    SynthProvider.initVisual(abc, ref);
    SynthProvider.getSynth() ? null : SynthProvider.initSynth();
  }, [abc]);

  return (
    <div className="bg-white-1 flex flex-col">
      <div ref={ref}></div>
    </div>
  );
};

export default AbcjsRenderer;
