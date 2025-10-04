import React, { useState } from "react";
import { FilmMyList } from "./FilmMyList";

export interface Film {
  title: string;
  rating: number;
  year: number;
}

interface FilmGridProps {
  films: Film[];
}

export const FilmGrid: React.FC<FilmGridProps> = ({ films: initialFilms }) => {
  const [films, setFilms] = useState<Film[]>(initialFilms);

  const handleDelete = (title: string) => {
    setFilms(prevFilms => prevFilms.filter(film => film.title !== title));
  };

  return (
    <div className="grid grid-cols-5 gap-6 pt-5">
      {films.map((film, index) => (
        <FilmMyList
          key={index}
          film={film}
          onDelete={() => handleDelete(film.title)}
        />
      ))}
    </div>
  );
};