"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/constants";
import { usePathname, useRouter } from "next/navigation";

const LeftSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <section className="bg-palette-4 relative left-0 top-0 flex w-fit h-full flex-col  justify-between border-none text-brown-1 max-md:hidden lg:w-[270px] lg:pl-8">
      <nav className="flex flex-col gap-6">
        {/* <Link
          href="/"
          className=" flex cursor-pointer items-center gap-1 pb-10 max-lg:justify-center"
        ></Link> */}

        {sidebarLinks.map(({ route, label, icon }) => {
          const isActive =
            pathname === route || pathname.startsWith(`${route}/`);

          return (
            <Link
              key={label}
              href={route}
              className={cn(
                "flex gap-3 items-center py-4 max-lg:px-4 justify-center lg:justify-start",
                { "bg-nav-focus border-r-4 border-orange-1": isActive }
              )}
            >
              <Image
                className="fill-orange-1"
                src={icon}
                alt={label}
                width={48}
                height={48}
              />
            </Link>
          );
        })}
      </nav>
    </section>
  );
};

export default LeftSidebar;
