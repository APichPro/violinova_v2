"use client";

import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Analyzer from "./Analyzer";
import Metronome from "./Metronome";

const RightSideBar = () => {
  const { user } = useUser();

  return (
    <section className="relative right-0 flex w-24 h-[50em] flex-col bg-pal-1 border-pal-2 border-2 rounded-l-lg items-center p-4">
      <SignedIn>
        <UserButton
          appearance={{
            elements: {
              userButtonBox: "w-16 h-16",
              avatarImage: "w-16 h-16",
              avatarBox: "w-16 h-16",
            },
          }}
        />
        <Link href={`/profile/${user?.id}`} className="flex">
          {/* <div className="flex w-full items-center justify-between">
            <h1 className="text-16 truncate font-semibold ">
              {user?.firstName}{" "}
            </h1>
            <Image
              src="/icons/chevron-right.svg"
              alt="arrow"
              width={24}
              height={24}
            />
          </div> */}
        </Link>
      </SignedIn>
      <Analyzer />
      <Metronome />
    </section>
  );
};

export default RightSideBar;
