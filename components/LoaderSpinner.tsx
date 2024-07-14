import { LuLoader2 } from "react-icons/lu";
import React from "react";

const LoaderSpinner = () => {
  return (
    <div className="flex-center h-screen w-full">
      <LuLoader2 className="animate-spin text-orange-1" size={30} />
    </div>
  );
};

export default LoaderSpinner;
