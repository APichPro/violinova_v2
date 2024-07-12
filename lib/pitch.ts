import React, { useState } from "react";

const MIDDLE_A = 440;

var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];


function noteFromPitch( frequency: number ) {
	var noteNum = 12 * (Math.log( frequency / MIDDLE_A )/Math.log(2) );
	return Math.round( noteNum ) + 69;
}

function frequencyFromNoteNumber( note: number) {
	return MIDDLE_A * Math.pow(2,(note-69)/12);
}

function centsOffFromPitch( frequency: number, note: number ) {
	return Math.floor( 1200 * Math.log( frequency / frequencyFromNoteNumber( note ))/Math.log(2) );
}

function autoCorrelate( buf: any, sampleRate: any ) {
	// Implements the ACF2+ algorithm
	var SIZE = buf.length;
	var rms = 0;

	for (var i=0;i<SIZE;i++) {
		var val = buf[i];
		rms += val*val;
	}
	rms = Math.sqrt(rms/SIZE);
	if (rms<0.01) // not enough signal
		return -1;

	var r1=0, r2=SIZE-1, thres=0.2;
	for (var i=0; i<SIZE/2; i++)
		if (Math.abs(buf[i])<thres) { r1=i; break; }
	for (var i=1; i<SIZE/2; i++)
		if (Math.abs(buf[SIZE-i])<thres) { r2=SIZE-i; break; }

	buf = buf.slice(r1,r2);
	SIZE = buf.length;

	var c = new Array(SIZE).fill(0);
	for (var i=0; i<SIZE; i++)
		for (var j=0; j<SIZE-i; j++)
			c[i] = c[i] + buf[j]*buf[j+i];

	var d=0; while (c[d]>c[d+1]) d++;
	var maxval=-1, maxpos=-1;
	for (var i=d; i<SIZE; i++) {
		if (c[i] > maxval) {
			maxval = c[i];
			maxpos = i;
		}
	}
	var T0 = maxpos;

	var x1=c[T0-1], x2=c[T0], x3=c[T0+1];
	var a = (x1 + x3 - 2*x2)/2;
	var b = (x3 - x1)/2;
	if (a) T0 = T0 - b/(2*a);

	return sampleRate/T0;
}

export function useAudioInput() {
  const [frequency, setFrequency] = useState<number>();
  const [cents, setCents] = useState<number>();
  const [note, setNote] = useState<string>();



  React.useEffect(() => {

    const buffer = new Float32Array( 2048 );
    const context = new AudioContext();
    const analyser = context.createAnalyser();
    let rafID = null;

    const handleSuccess = function (stream: MediaStream) {
      const source = context.createMediaStreamSource(stream);
	    analyser.fftSize = 2048;
	    source.connect( analyser );
      updatePitch();
    }

    function updatePitch() {
	    analyser.getFloatTimeDomainData( buffer );
      var ac = autoCorrelate( buffer, context.sampleRate );

      setFrequency(ac)
      setNote(ac != -1 ? noteStrings[noteFromPitch(ac)%12] : "N")
      setCents(ac != -1 ?centsOffFromPitch(ac!, noteFromPitch(ac)) : 0)

      if (!window.requestAnimationFrame)
        window.requestAnimationFrame = window.requestAnimationFrame;
      rafID = window.requestAnimationFrame( updatePitch );
    }

    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(handleSuccess);
  }, []);

  return [frequency,cents,note];
}
