"use client";

import { Search } from "lucide-react";
import { CategoryBlock } from "~/features/SearchBar";
import { useState } from "react";
import FilmCardBlock from "~/features/FilmCardBlock/ui/FilmCardBlock";

export default function HomePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  };
  return (
    <main>
      <section>
        <div className="flex flex-col justify-center gap-6">
          <div className="flex items-center justify-center space-x-3">
            <Search className="h-8 w-8 text-amber-500"></Search>
            <span className="text-lg font-semibold tracking-wide text-amber-500 uppercase">
              Открывайте кино
            </span>
          </div>
          <h1 className="flex flex-col items-center text-5xl leading-tight font-bold text-white md:text-7xl">
            Найдите свой
            <span className="block bg-linear-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
              идеальный фильм
            </span>
          </h1>
          <p className="mx-auto mb-15 max-w-210 text-center text-xl text-gray-300">
            Исследуйте коллекцию из более чем 50,000 фильмов. От классики до
            новинок, от голливудских блокбастеров до арт-хауса - найдите то, что
            ищете.
          </p>
        </div>
      </section>
      <section>
        <div className="mx-auto flex max-w-7xl flex-col gap-4">
          <CategoryBlock onToggleView={toggleViewMode} currentView={viewMode} />
        </div>
      </section>
      <section>
        <FilmCardBlock category={"new-releases"} />
        <FilmCardBlock category={"top-rated"} />
        <FilmCardBlock category={"trending"} />
        <FilmCardBlock category={"upcoming"} />
      </section>
    </main>
  );
}
