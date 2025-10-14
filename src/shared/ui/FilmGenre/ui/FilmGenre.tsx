import React from "react";

interface FilmGenreProps {
    genre : string
    color ?: string 
}

export const FilmGenre = ({genre, color} : FilmGenreProps) =>{
    return(
        <div className="flex">
        <div className= {`bg-gray-600 ${color} rounded-sm px-2 flex center py-0.5`}>
            <p className="text-sm">{genre}</p>
        </div>
        </div>
    )
}