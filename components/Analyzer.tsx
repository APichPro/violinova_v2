"use client";
import { useAudioInput } from "@/lib/pitch";

const Analyzer = () => {
  const [frequency, cents, note] = useAudioInput();

  return (
    <div>
      <h1>{frequency}</h1>
      <h1>{cents}</h1>
      <h1>{note}</h1>
    </div>
  );
};

export default Analyzer;
