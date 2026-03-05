"use client";

import React, { useState } from "react";
import { Popup } from "~/widgets/Popup";
import Image from "next/image";
import { FilmGenre } from "~/shared/ui/FilmGenre";
import { Property } from "~/entities/Property";

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
}

export const FilmCard = ({ movie }: FilmCardProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopupOpen(true);
  };

  const closePopup = () => setIsPopupOpen(false);

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

          <div className="absolute top-1/2 h-1/2 w-full rounded-b-2xl bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="absolute inset-3 z-10">
            <div className="flex justify-end">
              <Property
                text={"Новинка"}
                color={"bg-green-500/80 border-green-500 !py-0 !px-0.5 !rounded-sm"}
                textColor="!text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-1 pt-3 text-white">
          <p>{movie.title}</p>
          <div className="flex justify-between">
            <span>{movie.releaseDate.split('-')[0]}</span>
            <FilmGenre
              genre={Array.isArray(movie.genres) ? movie.genres[0] ?? "Неизвестно" : movie.genres ?? "Неизвестно"}
            />
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <Popup
          isOpen={isPopupOpen}
          onClose={closePopup}
          movieId={movie.tmdbId || movie.id} // передаем ID фильма
        />
      )}
    </>
  );
};