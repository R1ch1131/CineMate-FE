"use client";

import { Search } from "lucide-react";
import { CategoryBlock } from "~/features/SearchBar";
import { useState, useCallback, useEffect } from "react";
import FilmCardBlock from "~/features/FilmCardBlock/ui/FilmCardBlock";
import type { Category } from "~/shared/types/category";

function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function HomePage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [category, setCategory] = useState<Category>("all");
  const [searchInput, setSearchInput] = useState<string>("");

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const debouncedSearch = useDebounce(searchInput, 500);

  const handleSearchChange = useCallback((value: string) => setSearchInput(value), []);
  const toggleViewMode = () => setViewMode(prev => prev === "grid" ? "list" : "grid");

  function scrollToTop(duration = 500) {
  const start = window.scrollY;
  const startTime = performance.now();

  function animate(time: number) {
    const elapsed = time - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);

    window.scrollTo(0, start * (1 - ease));

    if (progress < 1) requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, category]);

useEffect(() => {
  scrollToTop(600); 
}, [page]);

  const getPagination = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) return Array.from({ length: totalPages }, (_, i) => i + 1);

    pages.push(1);
    if (page > 3) pages.push("...");

    const start = Math.max(2, page - 1);
    const end = Math.min(totalPages - 1, page + 1);

    for (let i = start; i <= end; i++) pages.push(i);
    if (page < totalPages - 2) pages.push("...");

    pages.push(totalPages);

    return pages;
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
          searchQuery={searchInput}
          onSearchChange={handleSearchChange}
        />
      </section>

      <section>
        <FilmCardBlock
          category={category}
          viewMode={viewMode}
          searchQuery={debouncedSearch}
          page={page}
          onTotalPagesChange={setTotalPages}
        />
      </section>

      <section className="flex justify-center items-center gap-2 py-10 flex-wrap">
       

        {getPagination().map((p, index) =>
          typeof p === "string" ? (
            <span key={`dots-${index}`} className="px-2 text-white">...</span>
          ) : (
            <button
              key={`page-${p}`}
              onClick={() => setPage(p)}
              className={`px-4 py-2 rounded border ${
                p === page ? "bg-gradient text-white font-bold border border-black" : "text-white border-white"
              }`}
            >
              {p}
            </button>
          )
        )}

       
      </section>
    </main>
  );
}