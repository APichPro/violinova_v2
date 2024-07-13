"use client";
import React, { useEffect, useRef } from "react";
import { useSynth } from "@/providers/SynthProvider";

const AbcjsRenderer = () => {
  return (
    <div className="bg-white-1 flex flex-col">
      <div id="visual"></div>
    </div>
  );
};

export default AbcjsRenderer;
