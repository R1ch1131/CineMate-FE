import React from "react";
import { useState } from "react";
import { Sparkles, Flame, Crown, Target } from "lucide-react";

export const CategoryTile: React.FC = () => {
  const [isFixed1, setIsFixed1] = useState(false);
  const [isFixed2, setIsFixed2] = useState(false);
  const [isFixed3, setIsFixed3] = useState(false);
  const [isFixed4, setIsFixed4] = useState(false);

  return (
    <ul className="flex flex-wrap gap-6">
      <li
        onClick={() => setIsFixed1(!isFixed1)}
        className={`${
          isFixed1
            ? `scale-95 bg-gradient-to-br from-orange-500/5 to-red-500/5`
            : `hover:scale-105 hover:bg-gradient-to-br hover:from-orange-500/10 hover:to-red-500/10`
        } border-glass group flex h-full w-50 cursor-default flex-col items-start justify-between gap-1 space-x-2 rounded-full border px-4 py-2.5 text-white shadow-2xl backdrop-blur-md transition-transform duration-200 ease-in-out select-none`}
      >
        <div className="flex w-full items-center justify-between">
          <div
            className={`${isFixed1 ? `text-orange-500` : `group-hover: text-gray-400`} transition-all duration-200`}
          >
            <Flame className="h-4 w-4" />
          </div>
          <h3
            className={`${isFixed1 ? `text-orange-500` : `group-hover:text-orange-500`} text-sm font-medium transition-all duration-200`}
          >
            В тренде
          </h3>
          <div
            className={`${isFixed1 ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"} flex items-center rounded-full px-2 py-0.5 text-xs font-bold backdrop-blur-md transition-all duration-200 ease-in-out`}
          >
            24
          </div>
        </div>
      </li>
      <li
        onClick={() => setIsFixed2(!isFixed2)}
        className={`${
          isFixed2
            ? `scale-95 bg-gradient-to-br from-blue-500/5 to-purple-500/5`
            : `hover:scale-105 hover:bg-gradient-to-br hover:from-blue-500/10 hover:to-purple-500/10`
        } border-glass group flex h-full w-50 cursor-default flex-col items-start justify-between gap-1 space-x-2 rounded-full border px-4 py-2.5 text-white shadow-2xl backdrop-blur-md transition-transform duration-200 ease-in-out select-none`}
      >
        <div className="flex w-full items-center justify-between">
          <div
            className={`${isFixed2 ? `text-blue-500` : `group-hover: text-gray-400`} transition-all duration-200`}
          >
            <Sparkles className="h-4 w-4" />
          </div>
          <h3
            className={`${isFixed2 ? `text-blue-500` : `group-hover:text-blue-500`} text-sm font-medium transition-all duration-200`}
          >
            Новинки
          </h3>
          <div
            className={`${isFixed2 ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"} flex items-center rounded-full px-2 py-0.5 text-xs font-bold backdrop-blur-md transition-all duration-200 ease-in-out`}
          >
            18
          </div>
        </div>
      </li>
      <li
        onClick={() => setIsFixed3(!isFixed3)}
        className={`${
          isFixed3
            ? `scale-95 bg-gradient-to-br from-amber-500/5 to-orange-500/5`
            : `hover:scale-105 hover:bg-gradient-to-br hover:from-amber-500/10 hover:to-orange-500/10`
        } border-glass group flex h-full w-50 cursor-default flex-col items-start justify-between gap-1 space-x-2 rounded-full border px-4 py-2.5 text-white shadow-2xl backdrop-blur-md transition-transform duration-200 ease-in-out select-none`}
      >
        <div className="flex w-full items-center justify-between">
          <div
            className={`${isFixed3 ? `text-amber-500` : `group-hover: text-gray-400`} transition-all duration-200`}
          >
            <Crown className="h-4 w-4" />
          </div>
          <h3
            className={`${isFixed3 ? `text-amber-500` : `group-hover:text-amber-500`} text-sm font-medium transition-all duration-200`}
          >
            Топ рейтинг
          </h3>
          <div
            className={`${isFixed3 ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"} flex items-center rounded-full px-2 py-0.5 text-xs font-bold backdrop-blur-md transition-all duration-200 ease-in-out`}
          >
            32
          </div>
        </div>
      </li>
      <li
        onClick={() => setIsFixed4(!isFixed4)}
        className={`${
          isFixed4
            ? `scale-95 bg-gradient-to-br from-green-500/5 to-teal-500/5`
            : `hover:scale-105 hover:bg-gradient-to-br hover:from-green-500/10 hover:to-teal-500/10`
        } border-glass group flex h-full w-50 cursor-default flex-col items-start justify-between gap-1 space-x-2 rounded-full border px-4 py-2.5 text-white shadow-2xl backdrop-blur-md transition-transform duration-200 ease-in-out select-none`}
      >
        <div className="flex w-full items-center justify-between">
          <div
            className={`${isFixed4 ? `text-green-500` : `group-hover: text-gray-400`} transition-all duration-200`}
          >
            <Target className="h-4 w-4" />
          </div>
          <h3
            className={`${isFixed4 ? `text-green-500` : `group-hover:text-green-500`} text-sm font-medium transition-all duration-200`}
          >
            Рекомендации
          </h3>
          <div
            className={`${isFixed4 ? "bg-white/20 text-white" : "bg-white/10 text-gray-400"} flex items-center rounded-full px-2 py-0.5 text-xs font-bold backdrop-blur-md transition-all duration-200 ease-in-out`}
          >
            15
          </div>
        </div>
      </li>
    </ul>
  );
};
