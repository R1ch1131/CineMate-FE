"use client";

import React from "react";
import Image from "next/image";
import FilmImage from "~/shared/assets/icons/filmImage.jpg";
import { Crown, Bookmark, Play, Heart, Share2, Loader2 } from "lucide-react";
import { PopupButton } from "~/shared/ui/PopupButton";
import { Property } from "~/entities/Property";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import type { MovieDetails } from "~/shared/types/movie";

interface PopupHeaderProps {
  movie: MovieDetails;
  onTabChange?: (index: number) => void;
}

export const PopupHeader = ({ movie, onTabChange }: PopupHeaderProps) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  // МУТАЦИЯ: Добавление в список
  const { mutate: addToWatchlist, isPending } = useMutation({
    mutationFn: async (status: string) => {
      const token = session?.user?.accessToken;
      if (!token) throw new Error("Необходима авторизация");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/watchlist/${movie.id}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Ошибка сервера");
      }
      return res.json() as unknown as Record<string, unknown>;
    },
    onSuccess: () => {
      // Инвалидируем основной список, чтобы на странице MyList данные обновились
      void queryClient.invalidateQueries({ queryKey: ["watchlist"] });
    },
    onError: (error: Error) => {
      console.error("Watchlist Error:", error.message);
      alert(`Ошибка: ${error.message}`);
    }
  });

  const handleWatchlistClick = () => {
    if (!session) return alert("Войдите в аккаунт, чтобы сохранять фильмы");
    addToWatchlist("WANT_TO_WATCH");
  };

  // Вспомогательные функции форматирования
  const formatRuntime = (minutes?: number) => {
    if (!minutes) return "Н/Д";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours} ч ${mins} мин` : `${mins} мин`;
  };

  const getYear = () => {
    return movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "—";
  };

  const getRatingColor = (rating?: number) => {
    if (!rating) return "text-gray-400";
    if (rating <= 5) return "text-red-500";
    if (rating <= 7.5) return "text-green-500";
    return "text-yellow-400";
  };

  return (
    <div className="absolute bottom-4 left-6 flex items-end">
      {/* Постер */}
      <div className="2k:h-70 2k:w-50 mr-4 h-58 w-42 overflow-hidden rounded-xl border-2 border-gray-600 shadow-2xl">
        <Image
          src={movie.posterUrl || FilmImage}
          alt={movie.title}
          width={300}
          height={450}
          className="h-full w-full object-cover"
          unoptimized
        />
      </div>

      <div className="mb-2">
        <div className="2k:gap-3.5 flex flex-col gap-3">
          {/* Свойства (Год, Время, ТОП) */}
          <div className="flex gap-4 2k:text-lg">
            <Property text={getYear().toString()} color="bg-orange-400" />
            {movie.runtime && (
              <Property
                text={formatRuntime(movie.runtime)}
                color="bg-blue-500/40 border border-blue-500/50"
              />
            )}
            {movie.voteAverage && movie.voteAverage >= 7 && (
              <Property
                text="TOP"
                color="bg-gradient-to-r from-lightorange to-darkorange"
                icon={Crown}
              />
            )}
          </div>

          <h2 className="text-3xl 2k:text-4xl font-bold text-white uppercase tracking-tight">
            {movie.title}
          </h2>

          <div className="flex items-center gap-2">
            <span className={clsx("mr-2 text-xl 2k:text-2xl font-bold", getRatingColor(movie.voteAverage))}>
              {movie.voteAverage?.toFixed(1) ?? "Н/Д"}
            </span>
            <span className="mr-2 h-5 border-r border-white/20"></span>
            <span className="text-gray-300 2k:text-xl">0 рецензий</span>
          </div>

          {/* Жанры */}
          <div className="flex gap-2 pb-2 2k:text-lg">
            {movie.genres?.map((genre, index) => (
              <Property key={index} text={genre} color="bg-white/10 border border-white/20" />
            ))}
          </div>

          {/* Кнопки действий */}
          <div className="flex gap-3.5">
            <PopupButton
              icon={Play}
              text="Смотреть трейлер"
              color="bg-lightorange text-white hover:bg-darkorange"
              onClick={() => onTabChange?.(2)}
            />

            <PopupButton
              icon={isPending ? Loader2 : Bookmark}
              text={isPending ? "Добавляем..." : "В список"}
              color={clsx(
                "bg-glass border border-frostedglass text-white transition-all",
                isPending ? "opacity-70" : "hover:bg-frostedglass"
              )}
              onClick={handleWatchlistClick}
              disabled={isPending}
            />

            <PopupButton icon={Heart} color="bg-glass border border-frostedglass text-white hover:bg-frostedglass" />
            <PopupButton icon={Share2} color="bg-glass border border-frostedglass text-white hover:bg-frostedglass" />
          </div>
        </div>
      </div>
    </div>
  );
};