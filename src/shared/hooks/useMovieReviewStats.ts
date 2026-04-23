"use client";

import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import type { Review } from "~/shared/types/review";

interface ReviewsResponse {
  content: Review[];
  totalElements: number;
  totalPages?: number;
}

const fetchReviewsStats = async (
  movieId: number,
  token?: string
): Promise<ReviewsResponse> => {
  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/reviews/movie/${movieId}?page=0&size=1000`,
    { headers }
  );

  if (res.status === 401 || res.status === 403) {
    return { content: [], totalElements: 0 };
  }

  if (!res.ok) throw new Error("Ошибка загрузки рецензий");

  return res.json() as Promise<ReviewsResponse>;
};

export const useMovieReviewStats = (movieId: number) => {
  const { data: session, status } = useSession();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["movie-reviews-stats", movieId, session?.user?.accessToken],
    queryFn: () => fetchReviewsStats(movieId, session?.user?.accessToken),
    enabled: !!movieId && status !== "loading",
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

  const reviews = data?.content ?? [];
  const totalCount = data?.totalElements ?? 0;

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : null;

  return {
    totalCount,
    averageRating,
    isLoading,
    error,
    refetch,
  };
};
