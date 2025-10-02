import React from "react";
import { useState } from "react";

export const Filters: React.FC = () => {
  const [sortBy, setSortBy] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const genreOptions = [
    "Все жанры",
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Horror",
    "Sci-Fi",
    "Fantasy",
    "Romance",
    "Thriller",
    "Biography",
    "History",
  ];
  const yearOptions = [
    "Все годы",
    "2025",
    "2024",
    "2023",
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
  ];
  const clearFilters = () => {
    setSortBy("");
    setSelectedYear("");
    setSelectedGenre("");
    setFilterBy("");
  };
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <div className="flex flex-col">
          <label className="mb-3 block text-sm font-medium text-white">
            Сортировка
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white transition-all duration-200 hover:bg-white/20 focus:border-amber-500 focus:outline-none"
          >
            <option value="popularity" className="bg-gray-800">
              По популярности
            </option>
            <option value="rating" className="bg-gray-800">
              По рейтингу
            </option>
            <option value="recent" className="bg-gray-800">
              По году
            </option>
            <option value="title" className="bg-gray-800">
              По названию
            </option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-3 block text-sm font-medium text-white">
            Жанр
          </label>
          <select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white transition-all duration-200 hover:bg-white/20 focus:border-amber-500 focus:outline-none"
          >
            {genreOptions.map((genre) => (
              <option key={genre} value={genre} className="bg-gray-800">
                {genre}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-3 block text-sm font-medium text-white">
            Год выпуска
          </label>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white transition-all duration-200 hover:bg-white/20 focus:border-amber-500 focus:outline-none"
          >
            {yearOptions.map((year) => (
              <option key={year} value={year} className="bg-gray-800">
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-3 block text-sm font-medium text-white">
            Категория
          </label>
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white transition-all duration-200 hover:bg-white/20 focus:border-amber-500 focus:outline-none"
          >
            <option value="all" className="bg-gray-800">
              Все фильмы
            </option>
            <option value="new" className="bg-gray-800">
              Новинки
            </option>
            <option value="trending" className="bg-gray-800">
              В тренде
            </option>
            <option value="top-rated" className="bg-gray-800">
              Топ рейтинг
            </option>
          </select>
        </div>
      </div>
      <div className="mt-6 flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Найдено: </span>
          <span className="font-semibold text-white">0</span>
          <span className="text-sm text-gray-400">фильмов</span>
        </div>
        <button
          onClick={clearFilters}
          className="transform px-4 py-2 font-medium text-amber-400 transition-all duration-200 hover:scale-105 hover:text-amber-300 active:scale-95"
        >
          Сбросить фильтры
        </button>
      </div>
    </>
  );
};
