import { Calendar } from "lucide-react";
import React from "react";
import { NewFilmItem } from "./NewFilmItem";

export const NewFilm = () => {
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

      <NewFilmItem />
       <NewFilmItem />
        <NewFilmItem />
         <NewFilmItem />
          <NewFilmItem />
      </div>
    </div>
  );
};
