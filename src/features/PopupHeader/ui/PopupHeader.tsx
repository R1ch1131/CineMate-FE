"use client";

import React, { useState } from "react";
import Image from "next/image";
import FilmImage from "~/shared/assets/icons/filmImage.jpg";
import {
  Crown,
  Bookmark,
  Play,
  Loader2,
  Target,
  CircleCheckBig,
  Clock4,
  X,
} from "lucide-react";
import { PopupButton } from "~/shared/ui/PopupButton";
import { Property } from "~/entities/Property";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import clsx from "clsx";

import type { MovieDetails } from "~/shared/types/movie";

interface PopupHeaderProps {
  movie: MovieDetails;
  onTabChange?: (index: number) => void;
}

interface WatchlistItem {
  tmdbId: number;
  status: string;
}

type WatchlistResponse = Record<string, WatchlistItem[]>;

const STATUS_OPTIONS = [
  {
    label: "Хочу посмотреть",
    value: "WANT_TO_WATCH",
    color: "bg-blue-500/40 border-blue-500 text-blue-200",
    icon: Target,
  },
  {
    label: "Смотрю",
    value: "WATCHING",
    color: "bg-green-500/40 border-green-500 text-green-200",
    icon: Play,
  },
  {
    label: "Просмотрено",
    value: "WATCHED",
    color: "bg-purple-500/40 border-purple-500 text-purple-200",
    icon: CircleCheckBig,
  },
  {
    label: "Отложено",
    value: "POSTPONED",
    color: "bg-red-500/40 border-red-500 text-red-200",
    icon: Clock4,
  },
];

export const PopupHeader = ({
  movie,
  onTabChange,
}: PopupHeaderProps) => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const [isPosterOpen, setIsPosterOpen] = useState(false);

  const { data: watchlistData, isLoading } = useQuery({
    queryKey: ["watchlist"],
    queryFn: async () => {
      const token = session?.user?.accessToken;

      if (!token) {
        throw new Error("Нет токена");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/watchlist/all`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Ошибка");
      }

      return res.json() as Promise<WatchlistResponse>;
    },
    enabled: status === "authenticated",
  });

  const watchlistArray = Object.values(watchlistData ?? {}).flat();

  const currentItem = watchlistArray.find(
    (item) => item.tmdbId === movie.id
  );

  const currentStatus = currentItem?.status;

  const currentOption = STATUS_OPTIONS.find(
    (opt) => opt.value === currentStatus
  );

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: async (statusValue: string) => {
      const token = session?.user?.accessToken;

      if (!token) {
        throw new Error("Нет токена");
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/watchlist/${movie.id}/status`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: statusValue,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("Ошибка сервера");
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["watchlist"],
      });
    },
  });

  const handleSelectStatus = (value: string) => {
    if (status !== "authenticated") {
      alert("Войдите в аккаунт");
      return;
    }

    updateStatus(value);
    setIsMenuOpen(false);
  };

  const formatRuntime = (m?: number) => {
    if (!m) return "Н/Д";

    const h = Math.floor(m / 60);

    return h ? `${h} ч ${m % 60} мин` : `${m} мин`;
  };

  const getYear = () =>
    movie.releaseDate
      ? new Date(movie.releaseDate).getFullYear()
      : "—";

  const getRatingColor = (r?: number) => {
    if (!r) return "text-gray-400";

    if (r <= 5) return "text-red-500";

    if (r <= 7.5) return "text-green-500";

    return "text-yellow-400";
  };

  if (status === "loading" || isLoading) {
    return (
      <div className="absolute bottom-4 left-6 flex items-end">
        <Image
          src={movie.posterUrl || FilmImage}
          alt={movie.title}
          width={300}
          height={450}
          className="h-58 w-42 object-cover"
        />

        <Loader2 className="ml-4 h-6 w-6 animate-spin text-white" />
      </div>
    );
  }

  return (
    <>
      <div className="absolute bottom-4 left-6 flex items-end">
        <div
          className="mr-4 h-58 w-42 cursor-pointer overflow-hidden rounded-xl border"
          onClick={() => setIsPosterOpen(true)}
        >
          <Image
            src={movie.posterUrl || FilmImage}
            alt={movie.title}
            width={300}
            height={450}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
            unoptimized
          />
        </div>

        <div>
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <Property
                text={getYear().toString()}
                color="bg-orange-400"
              />

              {movie.runtime && (
                <Property
                  text={formatRuntime(movie.runtime)}
                  color="bg-blue-500/40"
                />
              )}

              {movie.voteAverage && movie.voteAverage >= 7 && (
                <Property
                  text="TOP"
                  color="bg-orange-500"
                  icon={Crown}
                />
              )}
            </div>

            <h2 className="text-3xl font-bold uppercase text-white">
              {movie.title}
            </h2>

            <div className="flex items-center gap-2">
              <span
                className={clsx(
                  "text-xl font-bold",
                  getRatingColor(movie.voteAverage)
                )}
              >
                {movie.voteAverage?.toFixed(1) ?? "Н/Д"}
              </span>
            </div>

            <div className="flex gap-2">
              {movie.genres?.map((g, i) => (
                <Property
                  key={i}
                  text={g}
                  color="bg-white/10"
                />
              ))}
            </div>

            <div className="relative flex gap-3">
              <PopupButton
                icon={Play}
                text="Смотреть трейлер"
                color="bg-orange-500 text-white"
                onClick={() => onTabChange?.(2)}
              />

              <div className="relative">
                <PopupButton
                  icon={isPending ? Loader2 : Bookmark}
                  text={
                    isPending
                      ? "Сохраняем..."
                      : currentOption
                      ? currentOption.label
                      : "В список"
                  }
                  color={clsx(
                    "border",
                    currentOption
                      ? currentOption.color
                      : "border-frostedglass bg-glass text-white"
                  )}
                  onClick={() =>
                    setIsMenuOpen((prev) => !prev)
                  }
                  disabled={isPending}
                />

                {isMenuOpen && (
                  <div className="absolute top-full z-50 mt-2 w-56 rounded-xl border border-white/10 bg-black/90 shadow-lg">
                    {STATUS_OPTIONS.map((option) => {
                      const Icon = option.icon;

                      return (
                        <button
                          key={option.value}
                          onClick={() =>
                            handleSelectStatus(option.value)
                          }
                          className={clsx(
                            "flex w-full items-center gap-2 px-4 py-2 transition hover:bg-white/10",
                            option.value === currentStatus &&
                              "bg-white/20"
                          )}
                        >
                          <Icon className="h-4 w-4" />

                          {option.label}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isPosterOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={() => setIsPosterOpen(false)}
        >
          <div
            className="relative max-h-[95vh] max-w-[95vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={movie.posterUrl || FilmImage}
              alt={movie.title}
              width={1400}
              height={1800}
              className="max-h-screen w-auto rounded-2xl object-contain shadow-2xl"
              unoptimized
            />
            <button
              onClick={() => setIsPosterOpen(false)}
              className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white transition hover:bg-black"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};