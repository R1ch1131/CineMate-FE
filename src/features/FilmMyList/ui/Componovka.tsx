import React from "react";
import { FilmMyList } from "./FilmMyList";

export const Componovka = () =>{
    return(
        <div className="grid grid-cols-5 gap-6 pt-5">
            <FilmMyList />
            <FilmMyList />
            <FilmMyList />
            <FilmMyList />
            <FilmMyList />
            <FilmMyList />
  

        </div>
    )
}