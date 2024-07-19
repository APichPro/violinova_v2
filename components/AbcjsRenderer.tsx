"use client";
import { useSynth } from "@/providers/SynthProvider";
import React, { useEffect, useRef } from "react";

const AbcjsRenderer = (abc: any) => {
  const ref = useRef(null);
  const { initSynth } = useSynth();

  useEffect(() => {
    if (abc) {
      initSynth(abc.abc, ref, "test");
    }
  }, []);

  return (
    <div className="bg-white-1 flex flex-col w-full">
      <div ref={ref}></div>
    </div>
  );
};

export default AbcjsRenderer;
