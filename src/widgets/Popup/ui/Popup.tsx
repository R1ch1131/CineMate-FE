"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import FilmImage from "~/shared/assets/icons/filmImage.jpg";
import { PopupTabs } from "~/features/PopupTabs";
import { PopupHeader } from "~/features/PopupHeader";
import { useQuery } from "@tanstack/react-query";
import type { MovieDetails } from "~/shared/types/movie";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  movieId: number; 
}

const fetchMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/${movieId}`);

  if (!res.ok) {
    throw new Error("Ошибка при загрузке данных фильма");
  }

  const data = await res.json();
  return {
    ...data,
    id: data.id || data.movieId || data._id || movieId 
  };
};

const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalStyle;
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLocked]);
};

export const Popup: React.FC<PopupProps> = ({ isOpen, onClose, movieId }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const { data: movie, isLoading, error } = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => fetchMovieDetails(movieId),
    enabled: isOpen && !!movieId, 
  });

  useBodyScrollLock(isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div
      className="bg-shadow fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        ref={popupRef}
        className="flex h-11/12 w-1/2 flex-col overflow-hidden rounded-2xl border border-gray-600 bg-[#0f172a] shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading ? (
          <div className="flex h-full items-center justify-center text-white">
            Загрузка...
          </div>
        ) : error || !movie ? (
          <div className="flex h-full items-center justify-center text-red-500">
            Ошибка загрузки данных
          </div>
        ) : (
          <>
            <div className="relative h-5/12 w-full">
              <Image
                src={movie.backdropUrl ?? FilmImage}
                alt={movie.title}
                fill
                className="rounded-t-2xl object-cover"
                style={{ objectPosition: "center center" }}
                unoptimized
              />
              <div className="absolute right-0 bottom-0 left-0 h-3/4 bg-linear-to-t from-[#0f172a] to-transparent" />
              <div className="absolute top-4 right-4">
                <button
                  onClick={handleClose}
                  className="2k:h-12 2k:w-12 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-xl text-white transition-colors hover:bg-gray-700"
                >
                  ×
                </button>
              </div>
              <PopupHeader  
                onTabChange={setActiveTab} 
                movie={movie} 
              />
            </div>
            <div className="invisible-scroll flex-1 overflow-y-auto px-6">
              <PopupTabs 
                movie={movie}
                selectedIndex={activeTab} 
                onTabChange={setActiveTab} 
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};