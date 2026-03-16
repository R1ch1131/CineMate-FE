import React from "react";
import { useState } from "react";
import { CustomDropdown } from "~/entities/CustomDropdown";
import {
  sortOptions,
  genreOptions,
  yearOptions,
} from "./model/data";

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
    value: "all",
  });

  const clearFilters = () => {
    setSelectedSort({ label: "По популярности", value: "popularity" });
    setSelectedGenre({ label: "Все жанры", value: "all" });
    setSelectedYear({ label: "Все годы", value: "all" });
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
