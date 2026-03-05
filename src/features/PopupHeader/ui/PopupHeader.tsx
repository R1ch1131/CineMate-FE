import React from "react";
import Image from "next/image";
import FilmImage from "~/shared/assets/icons/filmImage.jpg";
import { Crown, Bookmark, Play, Heart, Share2 } from "lucide-react";
import { PopupButton } from "~/shared/ui/PopupButton";
import { Property } from "~/entities/Property";

import type { MovieDetails } from "~/shared/types/movie";

interface PopupHeaderProps {
  movie: MovieDetails;
  onTabChange?: (index: number) => void;
}

export const PopupHeader = ({ movie, onTabChange }: PopupHeaderProps) => {
  const handleWatchTrailer = () => {
    if (onTabChange) {
      onTabChange(2);
    }
  };

  const formatRuntime = (minutes?: number) => {
    if (!minutes) return "Н/Д";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours} ч ${mins} мин` : `${mins} мин`;
  };

  const getYear = () => {
    if (!movie.releaseDate) return "2024";
    return new Date(movie.releaseDate).getFullYear();
  };

  const getRatingColor = (rating?: number) => {
    if (!rating) return "text-gray-400";

    if (rating <= 5) return "text-red-500";
    if (rating <= 7.5) return "text-green-500";
    return "text-yellow-400"; 
  };

  return (
    <div className="absolute bottom-4 left-6 flex items-end ">
      <div className="2k:h-70 2k:w-50 mr-4 h-58 w-42 overflow-hidden rounded-xl border-2 border-gray-600 shadow-2xl">
        <Image
          src={movie.posterUrl || FilmImage}
          alt={movie.title}
          width={300}
          height={450}
          className="h-full w-full object-cover"
          unoptimized
        />
      </div>

      <div className="mb-2">
        <div className="2k:gap-3.5 flex flex-col gap-3">
          <div className="flex gap-4 2k:text-lg">
            <Property text={getYear().toString()} color="bg-orange-400" />

            {movie.runtime && (
              <Property
                text={formatRuntime(movie.runtime)}
                color="bg-blue-500/40 border border-blue-500/50"
              />
            )}

            {movie.voteAverage && movie.voteAverage >= 7 && (
              <Property
                text="TOP"
                color="bg-gradient-to-r from-lightorange to-darkorange"
                icon={Crown}
              />
            )}
          </div>

          <h2 className="text-3xl 2k:text-4xl font-bold text-white">
            {movie.title}
          </h2>

          <div className="flex items-center gap-2">
            <span
              className={`mr-2 text-xl 2k:text-2xl font-bold ${getRatingColor(
                movie.voteAverage
              )}`}
            >
              {movie.voteAverage?.toFixed(1) || "Н/Д"} 
            </span>

            <span className="mr-2 h-5 border-r border-amber-50"></span>

            <span className="text-gray-300 2k:text-xl">
              0 рецензий
            </span>
          </div>

          <div className="flex gap-2 pb-2 2k:text-lg">
            {movie.genres?.map((genre, index) => (
              <Property
                key={index}
                text={genre}
                color="bg-white/10 border border-white/20"
              />
            ))}
          </div>

          <div className="flex gap-3.5">
            <PopupButton
              icon={Play}
              text="Смотреть трейлер"
              color="bg-lightorange text-white hover:bg-darkorange"
              onClick={handleWatchTrailer}
            />

            <PopupButton
              icon={Bookmark}
              text="В списке"
              color="bg-glass border border-frostedglass text-white hover:bg-frostedglass"
            />

            <PopupButton
              icon={Heart}
              color="bg-glass border border-frostedglass text-white hover:bg-frostedglass"
            />

            <PopupButton
              icon={Share2}
              color="bg-glass border border-frostedglass text-white hover:bg-frostedglass"
            />
          </div>
        </div>
      </div>
    </div>
  );
};