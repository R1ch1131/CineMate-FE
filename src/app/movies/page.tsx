"use client";

import { Search } from "lucide-react";
import { CategoryBlock } from "~/features/SearchBar";
import { useState } from "react";
import FilmCardBlock from "~/features/FilmCardBlock/ui/FilmCardBlock";
import type { Category } from "~/shared/types/category";

export default function HomePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [category, setCategory] = useState<Category>("all");

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"));
  };

  return (
    <main>
      <section className="flex flex-col items-center gap-6">
        <div className="flex items-center gap-3">
          <Search className="h-8 w-8 text-amber-500" />

          <span className="text-lg font-semibold uppercase text-amber-500">
            Открывайте кино
          </span>
        </div>

        <h1 className="text-center text-5xl font-bold text-white md:text-7xl">
          Найдите свой
          <span className="block bg-linear-to-r from-amber-400 via-orange-500 to-red-600 bg-clip-text text-transparent">
            идеальный фильм
          </span>
        </h1>
      </section>

      <section className="mx-auto pt-10 max-w-7xl">
        <CategoryBlock
          activeCategory={category}
          onCategoryChange={setCategory}
          onToggleView={toggleViewMode}
          currentView={viewMode}
        />
      </section>

      <section>
        <FilmCardBlock category={category} />
      </section>
    </main>
  );
}