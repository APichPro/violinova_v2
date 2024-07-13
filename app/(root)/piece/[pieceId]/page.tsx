"use client";
import AbcjsRenderer from "@/components/AbcjsRenderer";
import LoaderSpinner from "@/components/LoaderSpinner";
import { api } from "@/convex/_generated/api";
import { useSynth } from "@/providers/SynthProvider";
import { useQuery } from "convex/react";
import React, { useEffect, useRef } from "react";

const PieceDetails = ({
  params,
}: {
  params: {
    pieceId: string;
  };
}) => {
  const piece = useQuery(api.pieces.getPieceById, {
    _id: params.pieceId,
  });
  const ref = useRef(null);
  const { getSynth, initSynth, initVisual } = useSynth();

  useEffect(() => {
    if (piece) {
      initVisual(piece.abc, ref);
      getSynth() ? null : initSynth(piece._id);
    }
  }, [piece]);

  if (!piece) return <LoaderSpinner />;

  return (
    <div>
      <p className="text-white-1">Course Details for {piece.title}</p>
      <div ref={ref}></div>
    </div>
  );
};

export default PieceDetails;
