"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { BookOpen, Flame, Newspaper, Loader2 } from "lucide-react";
import { StatsBlock } from "~/entities/StatsBlock";
import { CONSTANTS } from "~/shared/lib/strings";
import { FilmCard } from "~/entities/FilmCard/ui/FilmCard";
import { Property } from "~/entities/Property";
import { SideBar } from "~/features/SideBar";
import { ReviewCols } from "~/widgets/ReviewPage/ui/ReviewCols";
import type { Review } from "~/widgets/ReviewPage/ui/ReviewCols";

interface PaginatedResponse<T> {
  content: T[];
  totalElements?: number;
  totalPages?: number;
}

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
  if (!res.ok) throw new Error("Ошибка при загрузке фильмов");
  return res.json() as Promise<Movie[]>;
};

const fetchReviews = async (token?: string): Promise<Review[]> => {
  const headers: HeadersInit = {
    "Accept": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/reviews?page=0&size=4`, {
    headers
  });

  if (res.status === 403 || res.status === 401) return [];
  if (!res.ok) throw new Error("Ошибка сервера при загрузке рецензий");
  
  const data = (await res.json()) as PaginatedResponse<Review>;
  return data.content || [];
};

export default function HomePage() {
  const { data: session, status } = useSession();

  const { 
    data: movies, 
    isLoading: isMoviesLoading 
  } = useQuery<Movie[]>({
    queryKey: ["new-releases"],
    queryFn: fetchNewReleases,
  });

  const { 
    data: reviews, 
    isLoading: isReviewsLoading,
    isFetching: isReviewsFetching, // 1. Добавили отслеживание фонового обновления
    error: reviewsError,
    refetch: refetchReviews 
  } = useQuery<Review[]>({
    queryKey: ["home-reviews", session?.user?.accessToken, status],
    queryFn: () => fetchReviews(session?.user?.accessToken),
    enabled: status !== "loading", 
  });

  return (
    <main className="py-10">
      <div className="flex flex-col items-center gap-8">

        {/* Заголовок страницы */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <Newspaper className="h-8 w-8 text-amber-500" />
            <p className="text-lightorange text-2xl font-medium">
              {CONSTANTS.mainPage.news}
            </p>
          </div>
          <h1 className="text-5xl font-bold text-center">
            <span className="text-white">{CONSTANTS.mainPage.all} </span>
            <span className="gradient">{CONSTANTS.mainPage.cinema}</span>
          </h1>
          <div className="flex flex-col items-center gap-1 text-grey text-xl text-center">
            <p>{CONSTANTS.mainPage.newRewiews}</p>
            <p>{CONSTANTS.mainPage.filmfan}</p>
          </div>
        </div>

        <div className="pb-10 pt-7 w-full flex justify-center">
          <StatsBlock />
        </div>

        <div className="flex w-full max-w-7xl gap-8 px-4 lg:px-0">
          <div className="flex flex-1 flex-col gap-16">
            
            {/* Секция фильмов */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Flame className="h-8 w-8 text-red-500" />
                  <h2 className="text-3xl font-bold text-white">Новинки кино</h2>
                  <Property
                    text={"Горячее"}
                    color={"bg-red-500/20 border-red-500/50 "}
                    textColor="text-red-400"
                  />
                </div>
                <Link href="/movies" className="text-lightorange hover:underline">
                  Смотреть все &gt;
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {isMoviesLoading ? (
                  Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="h-95 w-full bg-glass animate-pulse rounded-2xl" />
                  ))
                ) : (
                  movies?.slice(0, 4).map((movie) => (
                    <FilmCard key={movie.id} movie={movie} variant={"grid"} />
                  ))
                )}
              </div>
            </section>

            {/* Секция рецензий */}
            <section className="flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BookOpen className="h-8 w-8 text-green-500" />
                  <h2 className="text-3xl font-bold text-white">Свежие рецензии</h2>
                  <Property
                    text={"Новое"}
                    color={"bg-green-500/20 border-green-500/50"}
                    textColor="text-green-400"
                  />
                </div>
                <Link href="/reviews" className="text-lightorange hover:underline">
                  Все рецензии &gt;
                </Link>
              </div>

              <div className="min-h-75 relative">
                {/* 2. Индикатор фонового обновления (показываем только если данные уже есть, но обновляются) */}
                {isReviewsFetching && !isReviewsLoading && (
                  <div className="absolute -top-8 right-0 flex items-center gap-2 text-[11px] text-lightorange font-bold uppercase tracking-tighter animate-pulse">
                    <Loader2 size={12} className="animate-spin" />
                    Обновление ленты...
                  </div>
                )}

                {isReviewsLoading ? (
                  <div className="flex justify-center py-20">
                    <Loader2 className="animate-spin text-lightorange" size={40} />
                  </div>
                ) : reviewsError ? (
                  <div className="text-center py-10 bg-glass border border-frostedglass rounded-2xl">
                    <p className="text-red-400">Ошибка загрузки данных</p>
                  </div>
                ) : reviews && reviews.length > 0 ? (
                  <ReviewCols 
                    reviews={reviews} 
                    onActionSuccess={() => {
                      // 3. Вызываем refetch при действиях (лайк, удаление)
                      void refetchReviews();
                    }} 
                  />
                ) : (
                  <div className="bg-glass border border-dashed border-frostedglass rounded-3xl py-16 text-center">
                    {status === "authenticated" ? (
                      <p className="text-grey italic">Рецензий пока нет. Будьте первым!</p>
                    ) : (
                      <p className="text-grey italic">Войдите, чтобы просматривать рецензии сообщества</p>
                    )}
                  </div>
                )}
              </div>
            </section>

          </div>
          <SideBar />
        </div>
      </div>
    </main>
  );
}