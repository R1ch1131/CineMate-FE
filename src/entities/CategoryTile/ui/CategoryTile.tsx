import React from "react";
import { useState } from "react";
import { Sparkles, Flame, Crown, Target } from "lucide-react";
import { Button } from "~/components/ui/button";

export const CategoryTile: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeColors = [
    "scale-95 bg-gradient-to-br from-orange-500/5 to-red-500/5 text-orange-500",
    "scale-95 bg-gradient-to-br from-blue-500/5 to-purple-500/5 text-blue-500",
    "scale-95 bg-gradient-to-br from-amber-500/5 to-orange-500/5 text-amber-500",
    "scale-95 bg-gradient-to-br from-green-500/5 to-teal-500/5 text-green-500",
  ];
  const defaultColors = [
    "hover:scale-105 hover:bg-gradient-to-br hover:from-orange-500/10 hover:to-red-500/10",
    "hover:scale-105 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10",
    "hover:scale-105 hover:bg-gradient-to-br hover:from-amber-500/10 hover:to-orange-500/10",
    "hover:scale-105 hover:bg-gradient-to-br hover:from-green-500/10 hover:to-teal-500/10",
  ];
  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const buttonData = [
    { component: Flame, label: "В тренде" },
    { component: Sparkles, label: "Новинки" },
    { component: Crown, label: "Топ рейтинг" },
    { component: Target, label: "Рекомендации" },
  ];

  return (
    <div className="flex flex-wrap gap-6">
      {buttonData.map(({ component: Icon, label }, index) => (
        <Button
          key={index}
          onClick={() => handleClick(index)}
          variant="defaultCinemateCategory"
          className={`${activeIndex === index ? activeColors[index] : defaultColors[index]} flex items-start justify-between gap-1`}
        >
          <Icon
            className={`${activeIndex === index ? activeColors[index] : defaultColors[index]} h-4 w-4 bg-none`}
          />
          {label}
          <span
            className={`${activeIndex === index ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"} flex items-center rounded-full px-2 py-0.5 text-xs font-bold backdrop-blur-md transition-all duration-200 ease-in-out`}
          >
            24
          </span>
        </Button>
      ))}
    </div>
  );
};
