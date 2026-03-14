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
      activeStyle: "bg-yellow-500/30 text-white",
    },
    {
      label: "Новинки",
      value: "new-releases",
      icon: Sparkles,
      activeStyle: "bg-red-500 text-white",
    },
    {
      label: "Топ рейтинг",
      value: "top-rated",
      icon: Crown,
      activeStyle: "bg-blue-500 text-white",
    },
    {
      label: "Скоро",
      value: "upcoming",
      icon: Target,
      activeStyle: "bg-green-500 text-white",
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