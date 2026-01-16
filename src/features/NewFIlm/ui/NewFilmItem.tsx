import { Award, Dot, Eye, Film, Zap } from "lucide-react";
import Image, { type StaticImageData } from "next/image";
import React, { type FC } from "react";
import { FilmGenre } from "~/shared/ui/FilmGenre";

interface NewFilmItemProps {
  image: string | StaticImageData;
  title: string;
  author: string;
  daysLeft: number;
  releaseDate: string;
  genre: string;
  views: string;
  rating: string;
}

export const NewFilmItem: FC<NewFilmItemProps> = ({
  image,
  title,
  author,
  daysLeft,
  releaseDate,
  genre,
  views,
  rating,
}) => {
  return (
    <div className="bg-frostedglass border-frostedglass relative h-45 w-full rounded-lg border p-3 text-sm">
      <div className="flex gap-4">
        <div className="">
          <Image
            className="h-30 w-20 rounded-lg object-cover"
            src={image}
            alt={title}
          />
          <div className="absolute top-1 left-16">
            <div className="center flex h-10 w-10 flex-col rounded-full border border-black bg-amber-500 text-xs font-bold">
              <p>{daysLeft}</p>
              <p>дн</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-medium pl-1">{title}</span>
          <span className="flex items-center gap-1.5 text-green-400">
            <Dot className="h-3.5 w-3.5" />
            {releaseDate}
          </span>
          <span className="flex items-center gap-1.5">
            <Award className="h-3.5 w-3.5 text-amber-500" />
            {author}
          </span>
          <span className="flex items-center gap-1.5">
            <Film className="h-3.5 w-3.5 text-blue-500" />
            <FilmGenre
              genre={genre}
              color="!bg-blue-500/30 text-blue-300"
            />
          </span>
          <div className="flex gap-2">
            <span className="text-grey flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              {views}
            </span>
            <div className="border-grey mt-1 h-3 border-l" />
            <span className="flex items-center gap-1.5 text-purple-500">
              <Zap className="h-3.5 w-3.5" />
              {rating}
            </span>
          </div>
        </div>
      </div>
      <div>
        <div className="border-grey flex h-1 w-full border-b pt-2" />
        <div className="flex justify-between px-1 pt-2 text-xs">
          <span className="text-grey">До премьеры</span>
          <span className="text-amber-300">{daysLeft} дня</span>
        </div>
      </div>
    </div>
  );
};
