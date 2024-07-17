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
    <section className="sticky right-0 top-0 flex flex-col border-none bg-palette-4 px-[30px] pt-8">
      <SignedIn>
        <Link href={`/profile/${user?.id}`} className="flex gap-3 pb-12">
          <UserButton />
          <div className="flex w-full items-center justify-between">
            <h1 className="text-16 truncate font-semibold ">
              {user?.firstName}{" "}
            </h1>
            <Image
              src="/icons/chevron-right.svg"
              alt="arrow"
              width={24}
              height={24}
            />
          </div>
        </Link>
      </SignedIn>
      <Analyzer />
      <Metronome />
    </section>
  );
};

export default RightSideBar;
