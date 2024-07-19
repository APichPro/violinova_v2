"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className="relative left-0 flex w-24 h-[50em] flex-col bg-pal-1 border-pal-2 border-2 rounded-r-lg">
      <nav className="flex justify-center items-center flex-col gap-16 h-full">
        <Link
          href="/"
          className=" flex cursor-pointer items-center gap-1 pt-4 max-lg:justify-center"
        >
          <Image
            src="/icons/logo.svg"
            alt="Violinova logo"
            width={80}
            height={80}
          />
        </Link>

        {sidebarLinks.map(({ route, label, icon }) => {
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`);

          return (
            <Link key={label} href={route} className="cursor-pointer">
              <Image src={icon} alt={label} width={48} height={48} />
            </Link>
          );
        })}
        {/* <ThemeSwitch /> */}
      </nav>
    </section>
  );
};

export default LeftSidebar;
