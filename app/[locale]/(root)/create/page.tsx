"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import JSZip from "jszip";
import $ from "jquery";
import { importMusicXML, sendMIDIToWebService } from "@/lib/import";
import { Editor } from "abcjs";
import Image from "next/image";

const Create = () => {
  const [file, setFile] = useState<File>();
  const [abc, setAbc] = useState<string>();
  const [tracks, setTracks] = useState<Array<number>>([]);

  const onDrop = useCallback((acceptedFiles: any) => {
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const XMLImport = (file: File) => {
    console.log("The file extension is mxl.");
    var zip = new JSZip();
    zip.loadAsync(file).then(function (zip: any) {
      zip.files["META-INF/container.xml"].async("string").then(function (
        xml: any
      ) {
        var rootfile = $.parseXML(xml).getElementsByTagName("rootfile")[0];
        var fname = rootfile.getAttribute("full-path");
        zip.files[fname!].async("string").then(function (text: any) {
          var abcString = importMusicXML(text, fname!);
          setAbc(abcString);
        });
      });
    });
  };

  const MIDIImport = (file: File) => {
    console.log("The file extension is mid.");
    const reader = new FileReader();
    reader.onload = function (event) {
      const midiData = event.target!.result;
      sendMIDIToWebService(midiData, file).then((abcString) => {
        setAbc(abcString);
      });
    };
    reader.readAsArrayBuffer(file);
  };

  const trackLists = (abcString: string) => {
    const match = abcString.match(/%%score\s+(.*)/);
    if (match) {
      let numbers = match[1].match(/\d+/g);
      setTracks(numbers ? numbers.map(Number) : []);
    }
  };

  const test = (abcString: string, trackRef: number) => {
    let lines = abcString.split("\n");
    let inSection = false;

    let result = lines
      .map((line: string) => {
        if (line.includes(`V:${trackRef}`)) {
          inSection = true;
          return line.startsWith("% ") ? line.slice(2) : "% " + line;
        } else if (line.includes("V:") && inSection) {
          inSection = false;
          return line;
        } else if (inSection) {
          return line.startsWith("% ") ? line.slice(2) : "% " + line;
        } else {
          return line;
        }
      })
      .join("\n");

    return result;
  };

  useEffect(() => {
    const load = async () => {
      switch (file?.name?.split(".").pop()) {
        case "mid": {
          MIDIImport(file);
          break;
        }
        case "mxl": {
          XMLImport(file);
          break;
        }
        default: {
          break;
        }
      }
    };

    if (abc) {
      trackLists(abc);
      new Editor("textArea", {
        canvas_id: "sheetMusic",
        abcjsParams: { responsive: "resize" },
        synth: {
          el: "#synthcontrol",
          cursorControl: {
            onEvent: (event: any) => {
              const all = document.querySelectorAll(".abcjs-note,.abcjs-rest");
              Array.from(all).forEach(
                (note) => ((note as HTMLElement).style.fill = "black")
              );
              event.elements![0][0].style.fill = "#F97535";

              const rect = event.elements![0][0].getBoundingClientRect();
              const isVisible =
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <=
                  (window.innerHeight ||
                    document.documentElement.clientHeight) &&
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
          },
        },
      });
    } else {
      load();
    }
  }, [abc, file]);

  const publishPiece = useMutation(api.pieces.publishPiece);

  async function onSubmit() {
    const piece = await publishPiece({
      title: "Test",
      description: "Desc",
      abc: abc!,
      private: false,
    });
  }

  return (
    <div className="flex flex-col justify-center items-center w-full overflow-y-hidden h-full">
      {!file ? (
        <div
          {...getRootProps()}
          className="relative flex aspect-square h-1/3 flex-col bg-pal-3 border-pal-2 border-2 rounded-lg justify-center items-center"
        >
          <input {...getInputProps()} />
          {isDragActive ? <p>Drop the files here</p> : <p>Drag and drop</p>}
          <Image
            src="/icons/upload.svg"
            alt="upload"
            width={160}
            height={160}
          />
        </div>
      ) : (
        <div className="flex h-full w-full gap-4">
          <div className="w-full h-full overflow-y-scroll">
            <div id="sheetMusic"></div>
          </div>
          <div className="flex-col flex justify-center h-full w-full">
            <textarea
              title="text"
              id="textArea"
              defaultValue={abc}
              className="w-full h-1/2 resize-none bg-pal-3 border-pal-2 border-2 rounded-lg p-4 text-2xl"
            ></textarea>
            <div className="flex w-full gap-4 justify-center ">
              {tracks.map((track) => {
                console.log(track);
                return (
                  <button
                    onClick={() => {
                      setAbc(test(abc!, track));
                    }}
                    key={track}
                    className="bg-pal-3 border-pal-2 border-2 rounded-lg"
                  >
                    Track {track.toString()}
                  </button>
                );
              })}
              <button onClick={() => onSubmit()}>Publish</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Create;
