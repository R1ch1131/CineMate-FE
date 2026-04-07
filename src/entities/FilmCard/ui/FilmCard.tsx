"use client";

import React, { useState } from "react";
import { Popup } from "~/widgets/Popup";
import Image from "next/image";
import { FilmGenre } from "~/shared/ui/FilmGenre";
import { Property } from "~/entities/Property";
import { Star } from "lucide-react";

type Movie = {
  id: number;
  tmdbId: number;
  title: string;
  overview: string;
  voteAverage?: number;
  releaseDate: string;
  posterUrl: string;
  genres: string | string[] | undefined; 
};

interface FilmCardProps {
  movie: Movie;
  variant: "grid" | "list";
}

const normalizeGenres = (genres: string | string[] | undefined): string[] => {
  if (!genres) return [];
  if (Array.isArray(genres)) return genres;
  return [genres]; 
};

export const FilmCard = ({ movie, variant = 'grid' }: FilmCardProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopupOpen(true);
  };

  const closePopup = () => setIsPopupOpen(false);

  const genreList = normalizeGenres(movie.genres);
  const year = movie.releaseDate?.split('-')[0] ?? 'Неизвестно';

  if (variant === "list") {
  return (
    <>
      <div
        className="group flex items-center gap-4 p-3 bg-glass rounded-lg cursor-pointer hover:bg-white/15 transition-colors" 
        onClick={openPopup}
      >
        <div className="relative w-28 h-35 shrink-0">
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            className="object-cover rounded-md"
            unoptimized
          />
        </div>

        <div className="flex flex-1">
          <div className="flex-1">
            <div className="flex justify-between pr-5">
              <h3 className="text-whitefont-bold text-xl group-hover:text-amber-500">
                {movie.title}
              </h3>
              {movie.voteAverage && (
                <div className="flex bg-glass py-1 px-2 rounded-lg border border-white/10 items-center gap-1 text-amber-400">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{movie.voteAverage.toFixed(1)}</span>
                </div>
              )}
            </div>

            <div className="mt-2 space-y-2">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <span>{year}</span>
                <div className="flex gap-1 flex-wrap">
                  {genreList.map((genre, index) => (
                    <FilmGenre key={index} genre={genre} />
                  ))}
                </div>
              </div>

              {movie.overview && (
                <p className="text-sm text-gray-300 line-clamp-2">
                  {movie.overview}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <Popup
          isOpen={isPopupOpen}
          onClose={closePopup}
          movieId={movie.tmdbId || movie.id}
        />
      )}
    </>
  );
}

  const firstGenre = genreList[0] ?? "Неизвестно";

  return (
    <>
      <div
        className="group cursor-pointer transition-transform hover:-translate-y-2.5 duration-400"
        onClick={openPopup}
      >
        <div className="relative h-74">
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            className="object-cover rounded-2xl"
            unoptimized
          />

          <div className="absolute top-1/2 h-1/2 w-full rounded-b-2xl bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="absolute inset-3 z-10">
            <div className="flex justify-between items-start">
              {movie.voteAverage && (
                <div className="flex items-center gap-1 bg-black/60 rounded-md px-2 py-1">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="text-amber-400 font-medium">
                    {movie.voteAverage.toFixed(1)}
                  </span>
                </div>
              )}

              <div className="flex justify-end ml-auto">
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-3 text-white">
          <p className="font-medium">{movie.title}</p>
          <div className="flex justify-between text-sm text-gray-400">
            <span>{year}</span>
            <FilmGenre genre={firstGenre} />
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <Popup
          isOpen={isPopupOpen}
          onClose={closePopup}
          movieId={movie.tmdbId || movie.id}
        />
      )}
    </>
  );
};