"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import tone2abc from "@/lib/midi2abc";
import { useDropzone } from "react-dropzone";
import { blobToNoteSequence } from "@magenta/music";
import { useSynth } from "@/providers/SynthProvider";

const Create = () => {
  const [files, setFiles] = useState<Blob>();
  const ref = useRef(null);
  const { getSynth, initSynth, initVisual } = useSynth();

  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles[0]);

    setFiles(new Blob([acceptedFiles[0]]));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    const load = async () => {
      if (files) {
        const noteSequence = await blobToNoteSequence(files);
        const abc = tone2abc(noteSequence);
        console.log(abc);
        initVisual(abc, ref);
        getSynth() ? null : initSynth("test");
      }
    };
    load();
  }, [files]);

  return (
    <div className="relative w-full">
      {!files ? (
        <div {...getRootProps()} className="bg-red-500 w-full h-full">
          <input {...getInputProps()} />
          {isDragActive ? <p>Drop the files here ...</p> : <p>Drag and drop</p>}
        </div>
      ) : (
        <div ref={ref}></div>
      )}
    </div>
  );
};

export default Create;
