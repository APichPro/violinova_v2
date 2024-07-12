"use client";
import { useAudioInput } from "@/lib/pitch";

const Analyzer = () => {
  const [frequency, cents, note] = useAudioInput();

  return (
    <div className="flex justify-center flex-col text-center">
      <h1 className="text-6xl">{note}</h1>
      <h1 className="text-3xl">{cents}</h1>
    </div>
  );
};

export default Analyzer;
