import React, { useState } from "react";
import { YIN } from "pitchfinder";

const MIDDLE_A = 400;
const SEMITONE = 69;

const NOTES = ["C", "C♯", "D", "D♯", "E", "F", "F♯", "G", "G♯", "A", "A♯", "B"];


// function getNote(frequency) {
//   const note = 12 * (Math.log(frequency / MIDDLE_A) / Math.log(2));
//   console.log(note)
//   return (Math.round(note) + SEMITONE);
// }

export function useAudioInput() {
  const [frequency, setFrequency] = useState();

  React.useEffect(() => {
    const handleSuccess = function (stream) {
      const context = new AudioContext();
      const source = context.createMediaStreamSource(stream);
      const processor = context.createScriptProcessor(2048, 1, 1);
      const detectPitch = YIN({
        sampleRate: 22050,
        bufferSize: 2048,
        probabilityThreshold: 0.8
      });

      source.connect(processor);
      processor.connect(context.destination);

      processor.onaudioprocess = function (e) {
        // Do something with the data, e.g. convert it to WAV
        // console.log(e.inputBuffer);
        const float32Array = e.inputBuffer.getChannelData(0); // get a single channel of sound
        const pitch = detectPitch(float32Array); // null if pitch cannot be identified

        // setFrequency(NOTES[(getNote(pitch) % 12)]);
        setFrequency(pitch)
      };
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleSuccess);
  }, []);

  return frequency;
}
