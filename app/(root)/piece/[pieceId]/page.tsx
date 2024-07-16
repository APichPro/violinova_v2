"use client";
import LoaderSpinner from "@/components/LoaderSpinner";
import Player from "@/components/Player";
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
  const { initSynth } = useSynth();

  useEffect(() => {
    if (piece) {
      initSynth(piece.abc, ref, piece._id);
    }
  }, [piece]);

  if (!piece) return <LoaderSpinner />;

  return (
    <div>
      <div ref={ref} className="overflow-y-scroll"></div>
    </div>
  );
};

export default PieceDetails;
