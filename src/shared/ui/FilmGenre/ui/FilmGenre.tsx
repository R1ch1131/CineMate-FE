import React from "react";

interface FilmGenreProps {
    genre : string
}

export const FilmGenre = ({genre} : FilmGenreProps) =>{
    return(
        <div className="flex">
        <div className=" bg-gray-700 rounded-sm px-2 flex center py-0.5">
            <p className="text-sm">{genre}</p>
        </div>
        </div>
    )
}