"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import midi2abc from "@/lib/midi2abc";
import { useDropzone } from "react-dropzone";
import { blobToNoteSequence } from "@magenta/music";
import { useSynth } from "@/providers/SynthProvider";
import { HiOutlineUpload } from "react-icons/hi";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import JSZip from "jszip";
import $ from "jquery";
import { importMusicXML } from "@/lib/utils";
import Player from "@/components/Player";

const Create = () => {
  const [file, setFile] = useState<File>();
  const ref = useRef(null);
  const { initSynth } = useSynth();
  const [abc, setAbc] = useState<string>();

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles[0]);
    setFile(acceptedFiles[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    const load = async () => {
      switch (file?.name?.split(".").pop()) {
        case "mid": {
          console.log("The file extension is mid.");
          console.log(file);
          const noteSequence = await blobToNoteSequence(new Blob([file]));
          const abcString = midi2abc(noteSequence);
          initSynth(abcString, ref, "test");
          setAbc(abcString);
          break;
        }
        case "mxl": {
          console.log("The file extension is mxl.");
          var zip = new JSZip();

          zip.loadAsync(file).then(function (zip: any) {
            zip.files["META-INF/container.xml"].async("string").then(function (
              xml: any
            ) {
              var rootfile =
                $.parseXML(xml).getElementsByTagName("rootfile")[0];
              var fname = rootfile.getAttribute("full-path");
              zip.files[fname!].async("string").then(function (text: any) {
                // var xmldata = $.parseXML(text);
                var result = importMusicXML(text);
                // console.log(xmldata);
                console.log(result);
                initSynth(result, ref, "test");
                setAbc(result);
              });
            });
          });

          break;
        }
        default: {
          //statements;
          break;
        }
      }
    };
    load();
  }, [file]);

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
    <div className="flex flex-col justify-center items-center">
      <button onClick={() => onSubmit()}>Publish</button>
      {!file ? (
        <div
          {...getRootProps()}
          className="border-[36px] border-palette-4 rounded-3xl aspect-square h-60 flex items-center justify-center flex-col text-2xl"
        >
          <input {...getInputProps()} />
          {isDragActive ? <p>Drop the files here</p> : <p>Drag and drop</p>}
          <HiOutlineUpload fill="#E5E0DA" size={80} />
        </div>
      ) : (
        <div ref={ref}></div>
      )}
    </div>
  );
};

export default Create;
