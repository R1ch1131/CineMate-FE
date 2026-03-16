"use client";

import React from "react";
import { Flame, Sparkles, Crown, Target } from "lucide-react";
import { Button } from "~/components/ui/button";
import type { Category } from "~/shared/types/category";

interface CategoryTileProps {
  activeCategory: Category;
  onChange: (category: Category) => void;
}

export const CategoryTile: React.FC<CategoryTileProps> = ({
  activeCategory,
  onChange,
}) => {
  const categories = [
    {
      label: "В тренде",
      value: "trending",
      icon: Flame,
      activeStyle: "bg-amber-800/30 border border-amber-500/30 text-amber-500/90",
    },
    {
      label: "Новинки",
      value: "new-releases",
      icon: Sparkles,
      activeStyle: "bg-blue-800/30 border border-blue-500/30 text-blue-400/90 ",
    },
    {
      label: "Топ рейтинг",
      value: "top-rated",
      icon: Crown,
      activeStyle: "bg-green-800/30 border border-green-500/30 text-green-400/90 ",
    },
    {
      label: "Скоро",
      value: "upcoming",
      icon: Target,
      activeStyle: "bg-violet-800/30 border border-violet-500/30 text-violet-400/90 ",
    },
  ] as const;

  const handleClick = (category: Category) => {
    if (activeCategory === category) {
      onChange("all");
    } else {
      onChange(category);
    }
  };

  return (
    <div className="flex flex-wrap gap-4">
      {categories.map(({ label, value, icon: Icon, activeStyle }) => {
        const isActive = activeCategory === value;

        return (
          <Button
            key={value}
            onClick={() => handleClick(value)}
            variant="defaultCinemateCategory"
            className={`flex items-center gap-2 transition ${
              isActive ? activeStyle : "hover:scale-103"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        );
      })}
    </div>
  );
};