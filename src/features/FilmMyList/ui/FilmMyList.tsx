'use client'

import React, { useState } from "react";
import Image from "next/image";
import FilmPlaceholder from '~/shared/assets/icons/filmImage.jpg'
import { ChevronDown, CircleCheckBig, Clock4, Dot, Play, Star, Target, Trash2 } from "lucide-react";
import { FilmMyListStatus } from "./FilmMyListStatus";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import type { WatchlistItem } from './FilmGrid'
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const STATUS_OPTIONS = [
  { label: "Хочу посмотреть", value: "WANT_TO_WATCH", clientValue: "want", color: "text-blue-300 border-blue-500 bg-blue-500/40", icon: Target },
  { label: "Смотрю", value: "WATCHING", clientValue: "watching", color: "text-green-300 border-green-500 bg-green-500/40", icon: Play },
  { label: "Просмотрено", value: "WATCHED", clientValue: "watched", color: "text-purple-300 border-purple-500/70 bg-purple-500/40", icon: CircleCheckBig },
  { label: "Отложено", value: "POSTPONED", clientValue: "postponed", color: "text-red-300 border-red-500 bg-red-500/40", icon: Clock4 },
];

const STATUS_MAP: Record<string, typeof STATUS_OPTIONS[0]> = {};
STATUS_OPTIONS.forEach(o => { STATUS_MAP[o.value] = o; });

interface FilmMyListProps {
  film: WatchlistItem;
  onActionSuccess?: () => void;
  variant: "grid" | "list";
}

export const FilmMyList: React.FC<FilmMyListProps> = ({ film, onActionSuccess, variant }) => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [isActive, setIsActive] = useState(false);

  const currentStatus = STATUS_MAP[film.status] ?? STATUS_OPTIONS[0];
  const [selectedOption, setSelectedOption] = useState(currentStatus);

  const { mutate: updateStatus, isPending } = useMutation({
    mutationFn: async (status: string) => {
      const token = session?.user?.accessToken;
      if (!token) throw new Error("Необходима авторизация");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/watchlist/${film.tmdbId}/status`, {
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
      const text = await res.text();
      return text ? JSON.parse(text) : null;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["watchlist"] });
      onActionSuccess?.();
    },
    onError: (error: Error) => {
      console.error("Watchlist Update Error:", error.message);
    },
  });

  const { mutate: deleteFromWatchlist, isPending: isDeleting } = useMutation({
    mutationFn: async () => {
      const token = session?.user?.accessToken;
      if (!token) throw new Error("Необходима авторизация");

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/watchlist/${film.tmdbId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Ошибка удаления");
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["watchlist"] });
      onActionSuccess?.();
    },
    onError: (error: Error) => {
      console.error("Watchlist Delete Error:", error.message);
    },
  });

  const handleSelect = (option: typeof STATUS_OPTIONS[0]) => {
    setSelectedOption(option);
    updateStatus(option.value);
  };

  const formatRuntime = (minutes?: number) => {
    if (!minutes) return "Н/Д";
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours} ч ${mins} мин` : `${mins} мин`;
  };

  const getYear = () => {
    return film.releaseDate ? new Date(film.releaseDate).getFullYear() : "—";
  };

  const formattedDate = film.addedDate
    ? new Date(film.addedDate).toLocaleDateString("ru-RU", { day: "numeric", month: "short", year: "numeric" })
    : "—";

   if (variant === "grid") {
  return (
    <div
      className="relative transition-all hover:scale-103"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <div className="relative">
        <Image
          className="h-80 rounded-2xl object-cover mb-3"
          src={film.posterUrl || FilmPlaceholder}
          alt={film.title}
          width={232}
          height={352}
          unoptimized={typeof film.posterUrl === 'string'}
        />
        <span className="absolute top-2 left-2 bg-black/50 text-white text-xs font-medium px-2 py-1 rounded-lg">
        <span className="flex center gap-1.5 text-lightorange">
          <Star width={15} className="fill-current" />
          <p className="text-sm font-bold">{(film.voteAverage ?? 0).toFixed(1)}</p>
        </span>
          
        </span>
      </div>

      
      <div className="flex justify-between pr-2">
        <p className="truncate">{film.title}</p>
        {getYear()}
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex">


        </div>
        <div className="flex">
          <FilmMyListStatus icon={selectedOption?.icon ?? Target} text={selectedOption?.label ?? "—"} color={selectedOption?.color ?? "text-grey border-grey bg-grey/40"} />
        </div>
        <div>
          <span className="text-grey flex gap-1">
            <p>Добавлен</p>
            <p>{formattedDate}</p>
          </span>
        </div>
      </div>

      <div className="absolute top-4 left-4">

      </div>
      <div className="absolute bottom-27 w-full left-0">
        <Menu>
          {({ open }) => (
            <div
              className={`bg-black/70 rounded-b-2xl flex flex-col gap-2
              transition-opacity p-1.5 ${isActive || open ? "opacity-100" : "opacity-0"}`}
            >
              <div className="flex gap-5">
                <MenuButton className="bg-frostedglass border-grey flex w-40 center gap-1 text-sm rounded-xl border-2 py-1">
                  {selectedOption?.label ?? "—"}
                  <ChevronDown className="h-5 w-5" />
                </MenuButton>

                <MenuItems className="absolute top-full left-0 mt-1 bg-gray-700 rounded-sm shadow-md z-10">
                  {STATUS_OPTIONS.map((option) => (
                    <MenuItem key={option.value}>
                      {({ active }) => (
                        <button
                          className={` px-4 py-1 text-sm w-full text-left ${active ? "bg-gray-800 rounded-sm text-white" : ""
                            }`}
                          onClick={() => handleSelect(option)}
                        >
                          {option.label}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>

                <button
                  onClick={() => deleteFromWatchlist()}
                  disabled={isDeleting}
                  className="h-9 w-9 flex center bg-red-500 rounded-full disabled:opacity-50"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          )}
        </Menu>
      </div>
    </div>
  );
};
return (
 <div className="bg-frostedglass rounded-2xl border border-white/17 p-4">
   <div className="relative">
      <div className="flex gap-5">
  <Image
    className="rounded-2xl object-cover"
    src={film.posterUrl || FilmPlaceholder}
    alt={film.title}
    width={110}
    height={120}
    unoptimized={typeof film.posterUrl === 'string'}
  />
  <div className="flex-1"> 
    <div className="flex justify-between">
      <div className="flex items-center">

      <p className="text-xl">{film.title}</p>
      <Dot />
      <p>{getYear()}</p>
      </div>
      <div className="bg-frostedglass p-2 rounded-xl border border-white/17">

      <span className="flex gap-1.5 text-lightorange">
        <Star width={17} className="fill-current" />
        <p className="font-bold">{(film.voteAverage ?? 0).toFixed(1)}</p>
      </span>
      </div>
    </div>

    <div className="flex flex-col py-3 gap-2">
      <div className="flex">
        <FilmMyListStatus 
          icon={selectedOption?.icon ?? Target} 
          text={selectedOption?.label ?? "—"} 
          color={selectedOption?.color ?? "text-grey border-grey bg-grey/40"} 
        />
      </div>
      <div>
        <span className="text-grey flex gap-2">
          <p>Добавлен</p>
          <p>{formattedDate}</p>
        </span>
      </div>
      <div className="flex justify-between">
        <Menu>
          {({ open }) => (
            <div className="relative">
                <MenuButton className="bg-frostedglass border-grey flex center gap-1 text-sm rounded-xl border-2 py-2 px-4">
                  {selectedOption?.label ?? "—"}
                  <ChevronDown className="h-5 w-5" />
                </MenuButton>

                <MenuItems className="absolute top-full left-0 mt-1 bg-gray-700 rounded-sm shadow-md z-10">
                  {STATUS_OPTIONS.map((option) => (
                    <MenuItem key={option.value}>
                      {({ active }) => (
                        <button
                          className={` px-4 py-1 text-sm w-full text-left ${active ? "bg-gray-800 rounded-sm text-white" : ""
                            }`}
                          onClick={() => handleSelect(option)}
                        >
                          {option.label}
                        </button>
                      )}
                    </MenuItem>
                  ))}
                </MenuItems>
            </div>
          )}
        </Menu>

        <button
          onClick={() => deleteFromWatchlist()}
          disabled={isDeleting}
          className="flex items-center gap-2 bg-red-500/70 hover:bg-red-600 rounded-full py-2 px-4 disabled:opacity-50 transition-colors"
        >
          <Trash2 className="h-5 w-5" />
          <p>Удалить</p>
        </button>
      </div>
    </div>
  </div>
</div>
    </div>
 </div>
)

}