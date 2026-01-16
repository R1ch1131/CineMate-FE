import { Calendar } from "lucide-react";
import React, { type FC } from "react";
import { NewFilmItem } from "./NewFilmItem";
import Film1 from "~/shared/assets/icons/filmImage.jpg";

const mockFilms = [
  {
    image: Film1,
    title: "Бегущий по лезвию 2099",
    author: "Дени Вильнёв",
    daysLeft: 23,
    releaseDate: "15 ноября",
    genre: "Sci-fi",
    views: "12.4K",
    rating: "Высокий",
  },
  {
    image: Film1,
    title: "Дюна: Часть вторая",
    author: "Дени Вильнёв",
    daysLeft: 23,
    releaseDate: "15 ноября",
    genre: "Sci-fi",
    views: "12.4K",
    rating: "Высокий",
  },
  {
    image: Film1,
    title: "Прибытие",
    author: "Дени Вильнёв",
    daysLeft: 23,
    releaseDate: "15 ноября",
    genre: "Sci-fi",
    views: "12.4K",
    rating: "Высокий",
  },
  {
    image: Film1,
    title: "Враг",
    author: "Дени Вильнёв",
    daysLeft: 23,
    releaseDate: "15 ноября",
    genre: "Sci-fi",
    views: "12.4K",
    rating: "Высокий",
  },
  {
    image: Film1,
    title: "Пленницы",
    author: "Дени Вильнёв",
    daysLeft: 23,
    releaseDate: "15 ноября",
    genre: "Sci-fi",
    views: "12.4K",
    rating: "Высокий",
  },
];

export const NewFilm: FC = () => {
  return (
    <div className="bg-glass rounded-2xl p-6">
      <div className="flex justify-between items-center pb-5">
        <div className="flex gap-3">
          <div className="center flex h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600">
            <Calendar className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">Скоро в кино</span>
            <span className="text-grey text-xs">Самые ожидаемые</span>
          </div>
        </div>
        <div className="px-3 py-1.5 relative flex rounded-full border border-orange-500/30 bg-gradient-to-r from-orange-500/20 to-pink-500/20 text-xs font-semibold text-orange-400">
          <span>New</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {mockFilms.map((film, index) => (
          <NewFilmItem
            key={index}
            image={film.image}
            title={film.title}
            author={film.author}
            daysLeft={film.daysLeft}
            releaseDate={film.releaseDate}
            genre={film.genre}
            views={film.views}
            rating={film.rating}
          />
        ))}
      </div>
    </div>
  );
};
