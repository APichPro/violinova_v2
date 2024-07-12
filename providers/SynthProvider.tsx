import {
  MidiBuffer,
  SynthObjectController,
  TuneObject,
  synth,
  renderAbc,
  Selector,
} from "abcjs";

let synthetizer: MidiBuffer;
let synthControl: SynthObjectController;
let visualObject: TuneObject;

const SynthProvider = (() => {
  const initVisual = (abc: string, ref: any) => {
    visualObject = renderAbc(ref.current, abc, {
      add_classes: true,
      clickListener: (abcelem: any) => {
        console.log(abcelem);
        // synth.seek(10)
        // synthControl.setProgress((abcelem.midiPitches![0].start - 3) / 47);
      },
    })[0];
  };
  const initSynth = () => {
    synthetizer = new synth.CreateSynth();
    synthControl = new synth.SynthController();
    synthControl.load(
      "#audio",
      {
        onEvent: (event: any) => {
          console.log(event.elements![0][0]);
          const notes = document.getElementsByClassName("abcjs-note");
          Array.from(notes).forEach(
            (note) => ((note as HTMLElement).style.fill = "black")
          );
          event.elements![0][0].style.fill = "red";
        },
      },
      {
        displayLoop: true,
        displayRestart: true,
        displayPlay: true,
        displayProgress: true,
        displayWarp: true,
      }
    );

    synthetizer
      .init({
        visualObj: visualObject,
      })
      .then(() => {
        synthControl!.setTune(visualObject, true, {
          soundFontVolumeMultiplier: 1,
          qpm: 120,
          defaultQpm: 120,
        });
      });
  };

  const getVisual = () => {
    return visualObject;
  };

  const getSynth = () => {
    return synthetizer;
  };

  const getSynthControl = () => {
    return synthControl;
  };

  return {
    initSynth,
    getSynth,
    getSynthControl,
    initVisual,
    getVisual,
  };
})();

export { SynthProvider };
