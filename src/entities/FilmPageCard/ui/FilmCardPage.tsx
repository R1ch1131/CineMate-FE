import type { StaticImageData } from "next/image";
import Image from "next/image";
import { Bookmark, Star, Play } from "lucide-react";

interface CardProps {
  card: {
    id: number;
    title: string;
    description: string;
    image: StaticImageData;
    year: string;
    rating: string;
    runtime: string;
  };
  viewMode: "grid" | "list";
}

export const Card: React.FC<CardProps> = ({ card, viewMode }) => {
  return (
    <div
      className={`${
        viewMode === "grid"
          ? "flex aspect-square flex-col hover:scale-105 sm:aspect-[3/4]"
          : "flex items-center space-x-4 p-4"
      } group relative transition-transform duration-200 hover:cursor-pointer`}
    >
      <div
        className={`relative aspect-[2/3] overflow-hidden rounded-2xl text-white shadow-2xl transition-all`}
      >
        <Image
          src={card.image}
          alt={card.title}
          className={`object-cover transition-transform duration-500 ${
            viewMode === "list"
              ? "h-40 w-24 flex-shrink-0"
              : "h-full w-full group-hover:scale-110"
          }`}
        />
        <div
          className={`${viewMode === "grid" ? "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" : ""}`}
        ></div>
      </div>
      <div
        className={`${viewMode === "grid" ? "mt-4 flex flex-grow flex-col justify-between gap-1" : "w-full"} text-white`}
      >
        {viewMode === "grid" ? (
          <>
            {" "}
            <div className="flex items-center space-x-2">
              <button className="transform rounded-full bg-white/20 p-2 backdrop-blur-sm transition-all hover:scale-110 hover:bg-white/30 active:scale-90">
                <Bookmark className="h-4 w-4 text-white" />
              </button>
              <button className="flex flex-1 transform items-center justify-center space-x-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 px-3 py-2 text-sm font-medium text-white transition-all hover:scale-105 hover:from-amber-600 hover:to-orange-700 active:scale-95">
                <Play className="h-3 w-3" />
                <span>Трейлер</span>
              </button>
            </div>
            <h3 className="line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-amber-400">
              {card.title}
            </h3>
            <div className="flex items-center space-x-2 text-sm">
              <Star className="h-4 w-4 fill-current text-amber-500" />
              <span className="font-semibold text-amber-500">
                {card.rating}
              </span>
              <span className="text-gray-400">• {card.year}</span>
              <span className="text-gray-400">• {card.runtime} мин</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {/* Тут нужно будет добавить логику с фильтрами и тегами */}
              <span className="rounded bg-white/10 px-2 py-1 text-xs text-gray-300">
                Sci-Fi
              </span>
              <span className="rounded bg-white/10 px-2 py-1 text-xs text-gray-300">
                Adventure
              </span>
            </div>
            <p
              className={`text-sm ${viewMode === "grid" ? "line-clamp-2 text-sm text-gray-400" : "mt-1"}`}
            >
              {card.description}
            </p>
          </>
        ) : (
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div>
                <h3 className="line-clamp-2 text-xl font-bold text-white transition-colors group-hover:text-amber-400">
                  {card.title}
                </h3>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 fill-current text-amber-500" />
                <span className="font-semibold text-amber-500">
                  {card.rating}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-5 text-xs">
              <span className="text-gray-400">{card.year}</span>
              <span className="text-gray-400">{card.runtime} мин</span>
              <span className="text-gray-400">Дени Вельнев</span>
            </div>
            <div className="flex flex-wrap gap-1">
              {/* Тут нужно будет добавить логику с фильтрами и тегами */}
              <span className="rounded bg-white/10 px-2 py-1 text-xs text-gray-300">
                Sci-Fi
              </span>
              <span className="rounded bg-white/10 px-2 py-1 text-xs text-gray-300">
                Adventure
              </span>
            </div>
            <p
              className={`text-sm ${viewMode === "list" ? "line-clamp-2 text-sm text-gray-400" : ""}`}
            >
              {card.description}
            </p>
            <div className="flex items-center space-x-2">
              <button className="flex transform items-center gap-2 rounded-xl bg-white/20 px-4 py-2 text-sm font-medium backdrop-blur-sm transition-all hover:bg-white/30 active:scale-90">
                <Bookmark className="h-4 w-4 text-white" />
                <span>В список</span>
              </button>
              <button className="flex transform items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-sm font-medium text-white transition-all hover:from-amber-600 hover:to-orange-700 active:scale-95">
                <Play className="h-4 w-4" />
                <span>Трейлер</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
