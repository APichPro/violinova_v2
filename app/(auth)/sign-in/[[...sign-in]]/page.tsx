import { SignIn } from "@clerk/nextjs";
import React from "react";

function page() {
  return (
    <div className="flex-center glassmorphism-auth h-screen w-full">
      <SignIn />
    </div>
  );
}

export default page;
