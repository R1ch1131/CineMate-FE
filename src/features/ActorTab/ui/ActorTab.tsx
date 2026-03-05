import React from "react";
import { ActorsList } from "~/entities/ActorList/ui/ActorList";
import { FilmCrew } from "~/entities/FilmCrew";

import type { MovieDetails} from "~/shared/types/movie"

interface ActorTabProps {
  movie: MovieDetails;
}

const formatCrewNames = (crew: Array<{ name: string }> | undefined): string => {
  if (!crew || crew.length === 0) return "Информация отсутствует";

  const limitedCrew = crew.slice(0, 2);
  const formattedNames = limitedCrew.map(member => member.name).join(", ");
  
  if (crew.length > 2) {
    return formattedNames + " ...";
  }
  
  return formattedNames;
};

export const ActorTab = ({movie}: ActorTabProps) => {
    return(
        <div className="text-white flex flex-col gap-6 p-3 2k:p-5">
            <p className="text-3xl font-bold">Актеры и съемочная группа</p>
            
            <p className="text-3xl font-bold">Главные роли</p>
            <div className="2k:gap-8 gap-10 grid grid-cols-4">
                <ActorsList movie={movie}/>
            </div>
            
            <p className="text-3xl font-bold">Съемочная группа</p>
            <div className="grid grid-cols-2 gap-4">
                <FilmCrew 
                    name={formatCrewNames(movie.directors)} 
                    role="Режиссер"
                />
                <FilmCrew 
                    name={formatCrewNames(movie.producers)} 
                    role="Продюсер"
                />
                <FilmCrew 
                    name={formatCrewNames(movie.cinematographers)} 
                    role="Оператор"
                />
                <FilmCrew 
                    name={formatCrewNames(movie.writers)} 
                    role="Сценарист"
                />
                <FilmCrew 
                    name={formatCrewNames(movie.composers)} 
                    role="Композитор"
                />
                <FilmCrew 
                    name={formatCrewNames(movie.editors)} 
                    role="Монтаж"
                />
            </div>
        </div>
    );
};