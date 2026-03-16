"use client";

import { useQuery } from "@tanstack/react-query";
import { StatsBlock } from "~/entities/StatsBlock";
import { CONSTANTS } from "~/shared/lib/strings";
import { FilmCard } from "~/entities/FilmCard/ui/FilmCard";
import Link from "next/link";
import { BookOpen, Flame, Newspaper } from "lucide-react";
import { Property } from "~/entities/Property";
import { SideBar } from "~/features/SideBar";

type Movie = {
  id: number;
  tmdbId: number;
  title: string;
  overview: string;
  voteAverage?: number;
  releaseDate: string;
  posterUrl: string;
  genres: string;
};

const fetchNewReleases = async (): Promise<Movie[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/new-releases`);

  if (!res.ok) {
    throw new Error("Ошибка при загрузке фильмов");
  }

  const data = (await res.json()) as Movie[];
  return data;
};

export default function HomePage() {
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ["new-releases"],
    queryFn: fetchNewReleases,
  });

  return (
    <main>
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center justify-center gap-3">
          <Newspaper className="h-8 w-8 text-amber-500" />
          <p className="text-lightorange text-2xl">
            {CONSTANTS.mainPage.news}
          </p>
        </div>

        <p className="text-5xl font-bold">
          <span className="text-white">
            {CONSTANTS.mainPage.all}{" "}
          </span>
          <span className="gradient">
            {CONSTANTS.mainPage.cinema}
          </span>
        </p>

        <div className="flex flex-col items-center justify-center gap-2 text-xl">
          <p className="text-grey">
            {CONSTANTS.mainPage.newRewiews}
          </p>
          <p className="text-grey">
            {CONSTANTS.mainPage.filmfan}
          </p>
        </div>

        <div className="pb-10 pt-7">
          <StatsBlock />
        </div>

        <div className="flex w-full max-w-7xl gap-8">
          <div className="flex flex-1 flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flame className="h-8 w-8 text-red-500" />
                <p className="text-3xl font-bold text-white">
                  Новинки кино
                </p>
                <Property
                  text={"Горячее"}
                  color={"bg-red-500/20 border-red-500/50 "}
                  textColor="text-red-400"
                />
              </div>

              <Link
                href="/movies"
                className="hover:translate-x-1.5 transition-transform"
              >
                <p className="text-lightorange">
                  Смотреть все &gt;
                </p>
              </Link>
            </div>

            <div className="grid grid-cols-4 gap-6">
              {isLoading && (
                <div className="col-span-4 flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
                </div>
              )}

              {error && (
                <p className="text-red-500 col-span-4 text-center">{error.message}</p>
              )}

              {!isLoading && !error && movies?.slice(0, 4).map((movie) => (
                <FilmCard key={movie.id} movie={movie} variant={"grid"} />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-green-500" />
                <p className="text-3xl font-bold text-white">
                  Свежие Рецензии
                </p>
                <Property
                  text={"Обновлено"}
                  color={"bg-green-500/20 border-green-500/50"}
                  textColor="text-green-400"
                />
              </div>

              <Link
                href="/reviews"
                className="hover:translate-x-1.5 transition-transform"
              >
                <p className="text-lightorange">
                  Все рецензии &gt;
                </p>
              </Link>
            </div>

            <div className="flex flex-col gap-5 py-5">
            </div>
          </div>

          <SideBar />
        </div>
      </div>
    </main>
  );
}