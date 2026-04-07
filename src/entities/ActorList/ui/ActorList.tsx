import React from "react";
import Image from "next/image";

import type { MovieDetails} from "~/shared/types/movie"

interface ActorProps {
  movie: MovieDetails;
}

export const ActorsList = ({ movie }: ActorProps) => {
  const actorsWithPhotos = movie.cast
    .filter(actor => actor.profileUrl) 
    .sort((a, b) => a.order - b.order); 

  if (actorsWithPhotos.length === 0) {
    return (
      <div className="text-grey text-center py-8">
        Нет информации об актерах
      </div>
    );
  }

  return (
    <div className="flex gap-6">
      {actorsWithPhotos.map((actor) => (
        <div
          key={actor.tmdbId}
          className="flex flex-col items-center gap-3 hover:-translate-y-1.5 transition-transform duration-300"
        >
          <div className="relative w-50 h-60 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={actor.profileUrl!}
              alt={actor.name}
              fill
              className="object-cover object-top hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 120px, (max-width: 1024px) 140px, 160px"
              unoptimized
            />
          </div>
          <div className="flex flex-col items-center text-center px-2">
            <p className="text-white font-semibold text-sm md:text-base">
              {actor.name}
            </p>
            <p className="text-grey text-xs md:text-sm">
              {actor.character}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};