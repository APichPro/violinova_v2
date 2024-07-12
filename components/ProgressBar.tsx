import { SynthProvider } from "@/providers/SynthProvider";
import React, { useState } from "react";

const ProgressBar = () => {
  const [first, setfirst] = useState(SynthProvider.getProgress());
  console.log(first);
  return (
    <div className="bg-red-500 z-10 w-full h-24">
      <div className={`bg-green-500 h-24 w-[${first}]`}></div>
    </div>
  );
};

export default ProgressBar;
