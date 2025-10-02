import React from "react";
import { FilmMyList } from "./FilmMyList";

interface FilmGridProps {
  films: { title: string; rating: number; year: number }[];
}

export const FilmGrid: React.FC<FilmGridProps> = ({ films }) => {
  return (
    <div className="grid grid-cols-5 gap-6 pt-5">
      {films.map((film, index) => (
        <FilmMyList key={index} film={film} />
      ))}
    </div>
  );
};