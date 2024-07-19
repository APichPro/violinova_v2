import React from "react";
import Image from "next/image"

const LoaderSpinner = () => {
  return (
    <div className="flex-center h-screen w-full">
       <Image src="/icons/loader-3.svg" alt="loading ..." width={48} height={48} />
    </div>
  );
};

export default LoaderSpinner;
