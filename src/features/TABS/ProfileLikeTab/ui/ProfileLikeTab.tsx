"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { ReviewCols, type Review } from "~/widgets/ReviewPage/ui/ReviewCols";

interface PaginatedResponse<T> {
  content: T[];
  totalElements?: number;
  totalPages?: number;
}

export const ProfileLikeTab = () => {
  const { data: session } = useSession();

  const { data, isLoading, refetch } = useQuery<PaginatedResponse<Review>>({
    queryKey: ["favorite-reviews", session?.user?.id],
    queryFn: async (): Promise<PaginatedResponse<Review>> => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews/favorites?page=0&size=100`,
        {
          headers: {
            Authorization: `Bearer ${session?.user?.accessToken}`,
          },
        }
      );
      if (!res.ok) return { content: [] };
      return (await res.json()) as PaginatedResponse<Review>;
    },
    enabled: !!session?.user?.id,
  });

  const reviews = data?.content ?? [];

  return (
    <div className="pt-3">
      <div className="flex justify-between items-center mb-8 px-2">
        <p className="text-white font-bold text-3xl uppercase tracking-tight">
          Избранные рецензии
        </p>
        <p className="text-grey">{data?.totalElements ?? reviews.length} Рецензий</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="animate-spin text-lightorange" size={40} />
        </div>
      ) : (
        <ReviewCols reviews={reviews} onActionSuccess={() => void refetch()} />
      )}
    </div>
  );
};