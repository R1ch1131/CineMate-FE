import React from "react";
import { FilmMyList } from "./FilmMyList";

export interface WatchlistItem {
  tmdbId: number;
  title: string;
  voteAverage: number;
  releaseDate: string;
  posterPath: string;
  posterUrl: string; 
  status: string;
  addedDate: string;
}

interface FilmGridProps {
  films: WatchlistItem[];
  viewMode: "grid" | "list";
  onActionSuccess?: () => void;
}

export const FilmGrid: React.FC<FilmGridProps> = ({ films, viewMode, onActionSuccess }) => {
  return (
    <div className={`mx-auto mt-8 max-w-7xl ${
      viewMode === "grid"
        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
        : "flex flex-col gap-4"
    }`}>
      {films.map((film) => (
        <FilmMyList
          key={film.tmdbId}
          film={film}
          variant={viewMode}
          onActionSuccess={onActionSuccess}
        />
      ))}
    </div>
  );
};
