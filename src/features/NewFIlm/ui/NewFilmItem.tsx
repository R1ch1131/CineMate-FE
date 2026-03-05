import {Film} from "lucide-react";
import Image from "next/image";
import React, { type FC } from "react";

interface NewFilmItemProps {
  posterUrl: string;
  title: string;
  author: string;
  daysLeft: number;
  releaseDate: string;
  genre: string;
  views: string;
  rating: string;
}

export const NewFilmItem: FC<NewFilmItemProps> = ({
  posterUrl,
  title,
  author,
  daysLeft,
  releaseDate,
}) => {
  return (
    <div className="bg-frostedglass border-frostedglass relative h-45 w-full rounded-lg border p-3 text-sm">
      <div className="flex gap-4">
        <div className="relative">
          <Image
            className="h-30 w-20 rounded-lg object-cover"
            src={posterUrl}
            alt={title}
            width={70}
            height={10}
            unoptimized 
          />
          <div className="absolute -top-1 -left-1">
            <div className="center flex h-10 w-10 flex-col rounded-full border border-black bg-amber-500 text-xs font-bold">
              <p>{daysLeft}</p>
              <p>дн</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <span className="text-lg font-bold pl-1 line-clamp-1">
  {title.length > 20 ? title.slice(0, 20) + "..." : title}
</span>
          <span className="flex items-center text-base gap-1.5 text-green-400">
            <p></p>
            {releaseDate}
          </span>
          <span className="flex items-center text-base gap-1.5">
            <Film className="h-4 w-4 text-blue-500" />
            <span className="truncate">{author}</span>
          </span>
        </div>
      </div>
      <div>
        <div className="border-grey flex h-1 w-full border-b pt-2" />
        <div className="flex justify-between px-1 pt-2 text-xs">
          <span className="text-grey">До премьеры</span>
          <span className="text-amber-300">{daysLeft} {daysLeft === 1 ? 'день' : daysLeft < 5 ? 'дня' : 'дней'}</span>
        </div>
      </div>
    </div>
  );
};