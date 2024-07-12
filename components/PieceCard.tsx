import React from "react";
import Link from "next/link";

const PieceCard = ({
  id,
  title,
  description,
  imgUrl,
}: {
  imgUrl: string;
  title: string;
  description: string;
  id: string;
}) => {
  return (
    <Link href={`/piece/${id}`} className="cursor-point">
      <figure className="flex flex-col gap-2">
        {/* <Image
          src={imgUrl}
          width={174}
          height={174}
          alt={title}
          className="aspect-square h-fit w-full rounded-xl 2xl:size-[200px]"
        /> */}
      </figure>
      <div className="flex flex-col">
        <h1 className="text-16 truncate font-bold text-white-1">{title}</h1>
        <h2 className="text-12 truncate font-normal text-white-4">{id}</h2>
      </div>
    </Link>
  );
};

export default PieceCard;
