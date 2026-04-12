"use client";

import React from "react";
import { Filters } from "~/entities/Filters";
import { Search, ChevronDown, TextAlignJustify, Grid2x2 } from "lucide-react";
import { CategoryTile } from "~/entities/CategoryTile";
import type { Category } from "~/shared/types/category";
import { X } from 'lucide-react'; 

interface CategoryBlockProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
  onToggleView: () => void;
  currentView: "grid" | "list";
  searchQuery: string; 
  onSearchChange: (query: string) => void; 
}

export const CategoryBlock: React.FC<CategoryBlockProps> = ({
  activeCategory,
  onCategoryChange,
  onToggleView,
  currentView,
  searchQuery,
  onSearchChange,
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClearSearch = () => {
    onSearchChange('');
  };
  

  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute top-1/2 left-6 h-6 w-6 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            placeholder="Поиск фильмов..."
            value={searchQuery} 
            onChange={(event) => onSearchChange(event.target.value)} 
            className="w-full rounded-2xl border border-white/20 bg-white/10 py-4 pr-6 pl-14 text-lg text-white placeholder-gray-400 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={handleClearSearch}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center space-x-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-4 transition hover:bg-white/20"
        >
          <TextAlignJustify className="h-5 w-5 text-gray-400" />

          <span className="hidden text-white sm:block">Фильтры</span>

          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>

        <div className="flex rounded-xl border border-white/10 bg-white/5 p-2">
          <button
            onClick={onToggleView}
            className={`rounded-lg p-3 transition ${
              currentView === "grid"
                ? "bg-amber-500 text-white"
                : "text-gray-400 hover:bg-white/10"
            }`}
          >
            <Grid2x2 className="h-5 w-5" />
          </button>

          <button
            onClick={onToggleView}
            className={`rounded-lg p-3 transition ${
              currentView === "list"
                ? "bg-amber-500 text-white"
                : "text-gray-400 hover:bg-white/10"
            }`}
          >
            <TextAlignJustify className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase text-white">
          Популярные категории
        </h3>

        <CategoryTile
          activeCategory={activeCategory}
          onChange={onCategoryChange}
        />
      </div>

      {isExpanded && (
        <div className="border-t border-white/10 pt-6">
          <Filters />
        </div>
      )}
    </div>
  );
};