"use client";
import AbcjsRenderer from "@/components/AbcjsRenderer";
import LoaderSpinner from "@/components/LoaderSpinner";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import React, { useState } from "react";

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

  if (!piece) return <LoaderSpinner />;

  return (
    <div>
      <p className="text-white-1">Course Details for {piece.title}</p>
      <AbcjsRenderer abc={piece.abc} />
    </div>
  );
};

export default PieceDetails;
