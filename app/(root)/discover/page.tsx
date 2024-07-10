"use client";
import AbcjsRenderer from "@/components/AbcjsRenderer";
import React, { useState } from "react";

const Discover = () => {
  const [abcNotation, setAbcNotation] = useState(`X:1 
D F E D | G A B c |`);

  return (
    <div>
      <h1 className="text-20 font-bold text-white-1">Discover</h1>
      <AbcjsRenderer abc={abcNotation} />
    </div>
  );
};

export default Discover;
