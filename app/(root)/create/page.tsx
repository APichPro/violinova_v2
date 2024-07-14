"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import tone2abc from "@/lib/midi2abc";
import { useDropzone } from "react-dropzone";
import { blobToNoteSequence } from "@magenta/music";
import { useSynth } from "@/providers/SynthProvider";
import { HiOutlineUpload } from "react-icons/hi";

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
    <div className="flex justify-center items-center">
      {!files ? (
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
