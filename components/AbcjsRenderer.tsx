import React, { useEffect, useRef } from "react";
import abcjs from "abcjs";

const AbcjsRenderer = ({ abc }: { abc: string }) => {
  const abcContainerRef = useRef(null);
  const synth = useRef(new abcjs.synth.CreateSynth());


  useEffect(() => {

    const visualObj = abcjs.renderAbc(abcContainerRef.current, abc, {
      add_classes: true, clickListener: (classes) => {
        console.log(classes)
        synth.current.seek(10, "seconds")
      }
    })[0];

    var synthControl = new abcjs.synth.SynthController();
    synthControl.load("#audio", 
      { 
       onEvent: (event) => {

        const notes = document.getElementsByClassName('abcjs-note');
        for (let note of [].slice.call(notes)) {
          note.style.fill = 'black';
        }

        event.elements![0][0].style.fill = 'red';
       },
      },
          {
              displayLoop: true, 
              displayRestart: true, 
              displayPlay: true, 
              displayProgress: true, 
              displayWarp: true
          }
      );


    synth.current.init({ visualObj, millisecondsPerMeasure: 1000 }).then(() => {
      synthControl.setTune(visualObj, true).then(() => {
      synth.current.prime().then((test) => {
      });
    })});


    return () => {
      synth.current.stop();
    };
  
  }, [abc]);

  return (
    <div className="bg-white-1 flex flex-col">
      <div ref={abcContainerRef}></div>
    </div>
  );
};

export default AbcjsRenderer;
