import React, { useEffect, useState } from "react";
import { Users, Film, BookOpen } from "lucide-react";
import { Stats } from "~/shared/ui/Stats/ui/Stats";

const isArrayOfUnknown = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

const fetchAllMovies = async (url: string): Promise<unknown[]> => {
  let page = 0;
  const size = 20;
  const all: unknown[] = [];

  while (true) {
    const res = await fetch(`${url}?page=${page}&size=${size}`);
    if (!res.ok) throw new Error("Ошибка загрузки фильмов");

    const data: unknown = await res.json();

    if (!isArrayOfUnknown(data)) break;

    all.push(...data);

    if (data.length < size) break;

    page++;
  }

  return all;
};

export const StatsBlock = () => {
  const [moviesCount, setMoviesCount] = useState(0);
  const [reviewsCount, setReviewsCount] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const movies: unknown[] = await fetchAllMovies(
          `${process.env.NEXT_PUBLIC_API_URL}/movies/new-releases`
        );
        setMoviesCount(movies.length);

        const reviewsRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/reviews/all?page=0&size=1`
        );
        if (!reviewsRes.ok) throw new Error("Ошибка загрузки рецензий");

        const reviewsData: { totalElements?: number } = await reviewsRes.json();

        setReviewsCount(reviewsData.totalElements ?? 0);

      } catch (e) {
        console.error("Ошибка загрузки статистики:", e);
      }
    };

    void fetchStats();
  }, []);

  return (
    <div className="flex justify-center gap-8 cursor-default">
      <Stats
        icon={Film}
        count={moviesCount}
        title={"Новых фильмов"}
        description={"в базе"}
        iconColor={"text-lightorange"}
      />

      <Stats
        icon={BookOpen}
        count={reviewsCount}
        title={"Свежих рецензий"}
        description={"написано"}
        iconColor={"text-green-500"}
      />

      <Stats
        icon={Users}
        count={1}
        title={"Пользователей"}
        description={"зарегистрировано"}
        iconColor={"text-blue-500"}
      />

      {/* <Stats
        icon={MessageCircle}
        count={0}
        title={"Обсуждений"}
        description={"на сайте"}
        iconColor={"text-purple-500"}
      /> */}
    </div>
  );
};