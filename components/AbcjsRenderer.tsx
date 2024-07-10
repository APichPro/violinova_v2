import React, { useEffect, useRef } from "react";
import abcjs from "abcjs";

const AbcjsRenderer = ({ abc }: { abc: string }) => {
  const abcContainerRef = useRef(null);

  useEffect(() => {
    if (abcContainerRef.current) {
      abcjs.renderAbc(abcContainerRef.current, abc, {
        add_classes: true,
      });
    }
  }, [abc]);

  return (
    <div className="bg-white-1 flex">
      <div id="audio" ref={abcContainerRef}></div>
      <button>Activate Audio</button>
    </div>
  );
};

export default AbcjsRenderer;
