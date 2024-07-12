import React, { useEffect, useState } from "react";
import { useSynth } from "@/providers/SynthProvider";

const ProgressComponent = () => {
  const { subscribeToProgress } = useSynth();
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const handleProgressUpdate = (newProgress: number) => {
      setProgress(newProgress);
    };

    subscribeToProgress(handleProgressUpdate);

    return () => {
      // Clean up if necessary (unsubscribe logic)
    };
  }, [subscribeToProgress]);

  return <div>Progress: {Math.round(progress * 100)}%</div>;
};

export default ProgressComponent;
