import {
  MidiBuffer,
  SynthObjectController,
  TuneObject,
  synth,
  renderAbc,
} from "abcjs";

let synthetizer: MidiBuffer;
let synthControl: SynthObjectController;
let visualObject: TuneObject;
let progress: number;

const SynthProvider = (() => {
  const initVisual = (abc: string, ref: any) => {
    visualObject = renderAbc(ref.current, abc, {
      add_classes: true,
      clickListener: (classes: any) => {
        console.log(classes);
        synthControl.seek(classes.abselem.counters.measureTotal, "beats");
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
          const notes = document.getElementsByClassName("abcjs-note");
          Array.from(notes).forEach(
            (note) => ((note as HTMLElement).style.fill = "black")
          );
          event.elements![0][0].style.fill = "red";

          const rect = event.elements![0][0].getBoundingClientRect();
          const isVisible =
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <=
              (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <=
              (window.innerWidth || document.documentElement.clientWidth);
          if (!isVisible) {
            event.elements![0][0].scrollIntoView({
              block: "center",
              inline: "center",
              behavior: "smooth",
            });
          }
        },
        onBeat(beatNumber, totalBeats, totalTime) {
          progress = beatNumber / totalBeats;
          // console.log(progress);
        },
      },
      {
        displayProgress: true,
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

  const getProgress = () => {
    return progress;
  };

  return {
    initSynth,
    getSynth,
    getSynthControl,
    initVisual,
    getVisual,
    getProgress,
  };
})();

export { SynthProvider };
