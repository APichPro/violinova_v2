"use client";
import PieceCard from "@/components/PieceCard";

import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import LoaderSpinner from "@/components/LoaderSpinner";

const Dashboard = () => {
  const allPieces = useQuery(api.pieces.getAllPieces);

  if (!allPieces) return <LoaderSpinner />;

  return (
    <div className="mt-9 flex-col gap-9">
      <section className="flex flex-col gap-5">
        <div className="podcast_grid">
          {allPieces.map(({ _id, title, description }) => (
            <PieceCard
              key={_id}
              title={title}
              description={description}
              id={_id}
              imgUrl=""
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
