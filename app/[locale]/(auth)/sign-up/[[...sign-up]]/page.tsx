import { SignUp } from "@clerk/nextjs";
import React from "react";

function page() {
  return (
    <div className="flex-center glassmorphism-auth h-screen w-full">
      <SignUp />
    </div>
  );
}

export default page;
