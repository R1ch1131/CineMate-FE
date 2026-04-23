import React, { useEffect, useRef, useState } from "react";
import { DetailItem } from "~/entities/DetailItem";
import { GlassBox } from "~/entities/GlassBox";
import { StatBox } from "~/entities/StatBox";
import { useMovieReviewStats } from "~/shared/hooks/useMovieReviewStats";

import type { MovieDetails } from "~/shared/types/movie";

interface ViewTabProps {
  movie: MovieDetails;
}

export const ViewTab = ({ movie }: ViewTabProps) => {
  const { totalCount, averageRating, isLoading: statsLoading, refetch } = useMovieReviewStats(movie.id);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (descriptionRef.current) {
      const lineHeight = parseFloat(getComputedStyle(descriptionRef.current).lineHeight);
      const maxHeight = lineHeight * 3; 
      setShowButton(descriptionRef.current.scrollHeight > maxHeight);
    }
  }, [movie.overview]);

  useEffect(() => {
    void refetch();
  }, [movie.id, refetch]);

  const formatMoney = (value?: string | number) => {
    if (!value) return "Неизвестно";

    const numeric =
      typeof value === "string"
        ? Number(value.replace(/[^0-9.-]+/g, ""))
        : value;

    if (isNaN(numeric)) return "Неизвестно";

    if (numeric >= 1_000_000_000) {
      return `$${(numeric / 1_000_000_000)
        .toFixed(1)
        .replace(/\.0$/, "")}b`;
    }

    if (numeric >= 1_000_000) {
      return `$${(numeric / 1_000_000)
        .toFixed(1)
        .replace(/\.0$/, "")}M`;
    }

    if (numeric >= 1_000) {
      return `$${(numeric / 1_000)
        .toFixed(1)
        .replace(/\.0$/, "")}k`;
    }

    return `$${numeric}`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Н/Д";
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const formatCountry = (country: string) => {
    if (country === "United States of America") {
      return "USA";
    }
    return country;
  };

  const formatCountries = (countries?: string[]) => {
    if (!countries || countries.length === 0) return "Н/Д";

    return formatCountry(countries[0]!);
  };

  return (
    <div className="relative text-white p-3 2k:p-5">
      <p className="mb-3 text-lg 2k:text-2xl font-bold">Описание</p>

      <div className="flex justify-between gap-5">
        <div className="flex flex-col w-2/3 gap-6">
          <div>
  <p
    ref={descriptionRef}
    className={`2k:text-xl transition-all duration-300 ${
      isExpanded 
        ? "" 
        : "line-clamp-3"
    }`}
  >
    {movie.overview}
  </p>

  {showButton && (
    <div className="flex justify-end">
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className="mt-2 pr-5 text-lightorange hover:underline"
      >
        {isExpanded ? "Скрыть" : "Открыть"}
      </button>
    </div>
  )}
</div>

          <div>
            <p className="pb-4 text-lg 2k:text-2xl font-bold">
              Статистика
            </p>

            <div className="grid grid-cols-2 gap-4">
              <StatBox
                value={averageRating ?? "Н/Д"}
                label="Рейтинг рецензий"
                color="text-lightorange"
                isLoading={statsLoading}
              />

              <StatBox
                value={movie.runtime ? `${movie.runtime} мин` : "Н/Д"}
                label="Длительность"
                color="text-green-500"
              />

              <StatBox
                value="0"
                label="В watchlist"
                color="text-purple-500"
              />

              <StatBox
                value={String(totalCount)}
                label="Рецензий на сайте"
                color="text-red-500"
                isLoading={statsLoading}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-1/3">
          <GlassBox title="Детали">
            <DetailItem
              label="Бюджет:"
              value={formatMoney(movie.budget)}
            />

            <DetailItem
              label="Сборы:"
              value={formatMoney(movie.revenue)}
            />

            <DetailItem
              label="Страна:"
              value={formatCountries(movie.countries)}
            />

            <DetailItem
              label="Премьера:"
              value={formatDate(movie.releaseDate)}
            />

            <DetailItem
              label="Язык:"
              value={movie.language || "Н/Д"}
            />
          </GlassBox>
        </div>
      </div>
    </div>
  );
};