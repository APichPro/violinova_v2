"use client";
import LoaderSpinner from "@/components/LoaderSpinner";
import { api } from "@/convex/_generated/api";
import { Editor } from "abcjs";
import { useQuery } from "convex/react";
import React, { useEffect, useRef } from "react";
import {
  ContextMenu,
  ContextMenuItem,
  ContextMenuTrigger,
} from "rctx-contextmenu";

const PieceDetails = ({ params }: { params: { pieceId: string } }) => {
  const piece = useQuery(api.pieces.getPieceById, { _id: params.pieceId });
  const ref = useRef(null);

  useEffect(() => {
    if (piece) {
      var abc_editor = new Editor("abc", {
        canvas_id: "paper",
        warnings_id: "warnings",
      });
    }
  }, [piece]);

  if (!piece) return <LoaderSpinner />;

  return (
    <div>
      <ContextMenuTrigger id="context-menu-1">
        <div ref={ref} className="overflow-y-scroll"></div>
        <textarea aria-label="text" id="abc"></textarea>
      </ContextMenuTrigger>
      <ContextMenu id="context-menu-1">
        <ContextMenuItem>Play</ContextMenuItem>
      </ContextMenu>
    </div>
  );
};

export default PieceDetails;
