"use client"
import React, { useEffect, useRef } from "react";
import abcjs from "abcjs";


const AbcjsRenderer = ({ abc }: { abc: string }) => {
  const abcContainerRef = useRef(null);
  // const synth = useRef(new abcjs.synth.CreateSynth());
  // const synthControl = useRef(new abcjs.synth.SynthController());


  useEffect(() => {
    const visualObj = abcjs.renderAbc(
      abcContainerRef.current!, 
      abc, 
      { 
        add_classes: true, 
        clickListener: (abcelem) => {
          console.log(abcelem)
          // synth.seek(10)
          // synthControl.setProgress((abcelem.midiPitches![0].start - 3)/47)
      }
    }
  )[0];

    const synthControl = new abcjs.synth.SynthController();
    const synth = new abcjs.synth.CreateSynth();

    synthControl.load("#audio", 
      { 
       onEvent: (event) => {

        const notes = document.getElementsByClassName('abcjs-note');
        for (let note of [].slice.call(notes)) {
          note.style.fill = 'black';
        }
        console.log(event)
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


    synth.init({ 
      visualObj,
      millisecondsPerMeasure: 1000 
    }).then(() => {
      synthControl.setTune(
        visualObj, true
      ).then(() => {
      synth.prime().then((test) => {

      });
    })});


    return () => {
      synth.stop();
    };
  
  }, [abc]);


  return (
    <div className="bg-white-1 flex flex-col">
      <div ref={abcContainerRef}></div>
    </div>
  );
};

export default AbcjsRenderer;
