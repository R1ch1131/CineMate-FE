"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

import { Reviews } from "~/features/Reviews";
import type { Review } from "~/features/Reviews";

interface ReviewTabProps {
  movieId: number;
}

const fetchReviewsByMovie = async (
  movieId: number,
  token?: string
): Promise<Review[]> => {
  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reviews/movie/${movieId}?page=0&size=20`,
    { headers }
  );

  if (res.status === 401 || res.status === 403) return [];
  if (!res.ok) throw new Error("Ошибка загрузки рецензий");

  const data = await res.json();

  return data.content ?? [];
};

export const ReviewTab = ({ movieId }: ReviewTabProps) => {
  const { data: session, status } = useSession();

  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["movie-reviews", movieId, session?.user?.accessToken],
    queryFn: () =>
      fetchReviewsByMovie(movieId, session?.user?.accessToken),
    enabled: !!movieId && status !== "loading",
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin text-lightorange" size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-400">
        Ошибка загрузки рецензий
      </div>
    );
  }

  const list = reviews ?? [];

  if (!list.length) {
    return (
      <div className="bg-glass border border-dashed border-frostedglass rounded-3xl py-16 text-center">
        <p className="text-grey italic">Пока нет рецензий</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 p-3 2k:p-5">
      <p className="text-white text-2xl font-bold">
        Рецензии пользователей
      </p>

      <div className="flex flex-col gap-4">
        {list.map((review) => (
          <Reviews
            key={review.id}
            review={review}
            onActionSuccess={() => {}}
          />
        ))}
      </div>
    </div>
  );
};