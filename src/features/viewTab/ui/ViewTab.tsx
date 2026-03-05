import React from "react";
import { DetailItem } from "~/entities/DetailItem";
import { GlassBox } from "~/entities/GlassBox";
import { StatBox } from "~/entities/StatBox";

import type {MovieDetails} from "~/shared/types/movie"

interface ViewTabProps {
  movie: MovieDetails;
}

export const ViewTab = ({ movie }: ViewTabProps) => {
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCountry = (country: string) => {
    if (country === 'United States of America') {
      return 'USA';
    }
    return country;
  };

  const formatCountries = (countries?: string[]) => {
    if (!countries || countries.length === 0) return "Н/Д";
    return countries.map(country => formatCountry(country)).join(', ');
  };

  return (
    <div className="relative text-white p-3 2k:p-5">
      <p className="mb-3 text-lg 2k:text-2xl font-bold">Описание</p>
      <div className="flex justify-between gap-5">
        <div className="flex flex-col w-2/3 gap-6">
          <div>
            <p className="2k:text-xl">{movie.overview}</p>
          </div>
          <div>
            <p className="pb-4 text-lg 2k:text-2xl font-bold">Статистика</p>
            <div className="grid grid-cols-2 gap-4">
              <StatBox 
                value={movie.voteAverage?.toFixed(1) || "Н/Д"} 
                label="Рейтинг CineMate" 
                color="text-lightorange"
              />
              <StatBox 
                value={movie.runtime ? `${movie.runtime} мин` : "Н/Д"} 
                label="Длительность" 
                color="text-green-500"
              />
              <StatBox 
                value='0'
                label="В watchlist" 
                color="text-purple-500" 
              />
              <StatBox 
                value='0'
                label="Рецензий на сайте" 
                color="text-red-500" 
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4 w-1/3">
          <GlassBox title="Детали">
            <DetailItem label="Бюджет:" value={movie.budget ?? "Неизвестно"} />
            <DetailItem label="Сборы:" value={movie.revenue ?? "Неизвестно"} />
            <DetailItem label="Страна:" value={formatCountries(movie.countries)} /> 
            <DetailItem label="Премьера:" value={formatDate(movie.releaseDate)} /> 
            <DetailItem label="Язык:" value={movie.language || "Н/Д"} /> 
          </GlassBox>
        </div>
      </div>
    </div>
  );
};