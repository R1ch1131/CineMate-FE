"use client";
import React from "react";
import { Filters } from "~/entities/Filters";
import {
  Sparkles,
  Flame,
  Crown,
  Target,
  Search,
  ChevronDown,
  TextAlignJustify,
  Grid2x2,
} from "lucide-react";
import { CategoryTile } from "~/entities/CategoryTile";
import { useState } from "react";

export const CategoryBlock: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute top-1/2 left-6 h-6 w-6 -translate-y-1/2 transform text-gray-400" />
            <input
              type="text"
              className="w-full rounded-2xl border border-white/20 bg-white/10 py-4 pr-6 pl-14 text-lg text-white placeholder-gray-400 transition-all duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 focus:outline-none"
              placeholder="Поиск фильмов, режиссеров, актеров..."
            />
          </div>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex scale-100 transform items-center space-x-2 rounded-2xl border border-white/20 bg-white/10 px-4 py-4.5 transition-all hover:scale-105 hover:bg-white/20 active:scale-95"
          >
            <TextAlignJustify className="h-5 w-5 text-gray-400" />
            <span className="hidden font-medium text-white sm:block">
              Фильтры
            </span>
            <ChevronDown
              className={`h-4 w-4 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : "rotate-0"}`}
            />
          </button>
          <div className="flex rounded-xl border border-white/10 bg-white/5 p-1">
            <button
              className={`transform rounded-lg p-3 text-gray-400 transition-all hover:scale-105`}
            >
              <Grid2x2 className="h-4 w-4" />
            </button>
            <button
              className={`transform rounded-lg p-3 text-gray-400 transition-all hover:scale-105`}
            >
              <TextAlignJustify className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div>
          <h3 className="mb-4 text-sm font-semibold tracking-wide text-white uppercase">
            Популярные категории
          </h3>

          <CategoryTile />
        </div>
        {isExpanded && (
          <div className="border-t border-white/10 pt-6">
            <Filters />
          </div>
        )}
      </div>
    </>
  );
};
