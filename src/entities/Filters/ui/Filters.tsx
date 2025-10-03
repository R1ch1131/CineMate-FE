import React from "react";
import { useState } from "react";
import { CustomDropdown } from "~/entities/CustomDropdown";

export const Filters: React.FC = () => {
  const [selectedSort, setSelectedSort] = useState({
    label: "По популярности",
    value: "popularity",
  });
  const [selectedGenre, setSelectedGenre] = useState({
    label: "Все жанры",
    value: "all",
  });
  const [selectedYear, setSelectedYear] = useState({
    label: "Все годы",
    value: "any",
  });
  const [selectedCategory, setSelectedCategory] = useState({
    label: "Все фильмы",
    value: "all",
  });

  const sortOptions = [
    { label: "По популярности", value: "popularity" },
    { label: "По рейтингу", value: "rating" },
    { label: "По году", value: "recent" },
    { label: "По названию", value: "title" },
  ];
  const genreOptions = [
    { label: "Все жанры", value: "all" },
    { label: "Action", value: "action" },
    { label: "Adventure", value: "adventure" },
    { label: "Comedy", value: "comedy" },
    { label: "Drama", value: "drama" },
    { label: "Horror", value: "horror" },
    { label: "Sci-Fi", value: "sci-fi" },
    { label: "Fantasy", value: "fantasy" },
    { label: "Romance", value: "romance" },
    { label: "Thriller", value: "thriller" },
    { label: "Biography", value: "biography" },
    { label: "History", value: "history" },
  ];
  const yearOptions = [
    { label: "Все годы", value: "all" },
    { label: "2025", value: "2025" },
    { label: "2024", value: "2024" },
    { label: "2023", value: "2023" },
    { label: "2022", value: "2022" },
    { label: "2021", value: "2021" },
    { label: "2020", value: "2020" },
    { label: "2019", value: "2019" },
    { label: "2018", value: "2018" },
    { label: "2017", value: "2017" },
    { label: "2016", value: "2016" },
  ];
  const categoryOptions = [
    { label: "Все фильмы", value: "all" },
    { label: "Новинки", value: "new" },
    { label: "В тренде", value: "trending" },
    { label: "Топ рейтинг", value: "top-rated" },
  ];

  const clearFilters = () => {
    setSelectedSort({ label: "По популярности", value: "popularity" });
    setSelectedGenre({ label: "Все жанры", value: "all" });
    setSelectedYear({ label: "Все годы", value: "all" });
    setSelectedCategory({ label: "Все фильмы", value: "all" });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <CustomDropdown
          label="Сортировка"
          options={sortOptions}
          selected={selectedSort}
          setSelected={setSelectedSort}
        />
        <CustomDropdown
          label="Жанр"
          options={genreOptions}
          selected={selectedGenre}
          setSelected={setSelectedGenre}
        />
        <CustomDropdown
          label="Год выпуска"
          options={yearOptions}
          selected={selectedYear}
          setSelected={setSelectedYear}
        />
        <CustomDropdown
          label="Категория"
          options={categoryOptions}
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
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
