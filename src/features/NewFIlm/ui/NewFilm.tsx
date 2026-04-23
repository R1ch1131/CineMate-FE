import { Calendar } from "lucide-react";
import React, { type FC } from "react";
import { NewFilmItem } from "./NewFilmItem";
import { useUpcomingMovies } from "../api/useUpcomingMovies";

export const NewFilm: FC = () => {
  const { data: movies, isLoading, error } = useUpcomingMovies();

  const calculateDaysLeft = (releaseDate: string) => {
    const today = new Date();
    const release = new Date(releaseDate);
    const diffTime = release.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long' 
    });
  };

  const formatVoteAverage = (vote: number) => {
    if (vote >= 7) return 'Высокий';
    if (vote >= 5) return 'Средний';
    return 'Низкий';
  };

  const formatViews = (voteAverage: number) => {
    const baseViews = Math.floor(voteAverage * 1000);
    return `${baseViews}K`;
  };

  if (isLoading) {
    return (
      <div className="bg-glass rounded-2xl p-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-glass rounded-2xl p-6">
        <div className="text-red-500 text-center">
          Ошибка загрузки: {error instanceof Error ? error.message : 'Unknown error'}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-glass rounded-2xl p-6">
      <div className="flex justify-between items-center pb-5">
        <div className="flex gap-3">
          <div className="center flex h-10 w-10 rounded-xl bg-linear-to-br from-orange-500 to-pink-600">
            <Calendar className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold">Скоро в кино</span>
            <span className="text-grey text-xs">Самые ожидаемые</span>
          </div>
        </div>
        <div className="px-3 py-1.5 relative flex rounded-full border border-orange-500/30 bg-linear-to-r from-orange-500/20 to-pink-500/20 text-xs font-semibold text-orange-400">
          <span>New</span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {movies
  ?.slice() 
  .sort((a, b) => {
    return new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime();
  })
  .map((movie) => (
    <NewFilmItem
      key={movie.id}
      posterUrl={movie.posterUrl}
      title={movie.title}
      author={movie.genres.slice(0, 2).join(', ')}  
      daysLeft={calculateDaysLeft(movie.releaseDate)}
      releaseDate={formatReleaseDate(movie.releaseDate)}
      genre={movie.genres[0] ?? 'Не указан'}
      views={formatViews(movie.voteAverage)}
      rating={formatVoteAverage(movie.voteAverage)}
    />
  ))}
      </div>
    </div>
  );
};