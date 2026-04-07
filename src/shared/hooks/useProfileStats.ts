import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

interface ReviewStats {
  totalReviews: number;
  totalLikes: number;
}

export function useProfileStats() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const token = session?.user?.accessToken;

  return useQuery<ReviewStats>({
    queryKey: ["profile-stats", userId],
    queryFn: async () => {
      if (!userId || !token) {
        return { totalReviews: 0, totalLikes: 0 };
      }

      // Загружаем все рецензии пользователя (пагинация с большим размером)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews/user/${userId}?page=0&size=1000`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();
      const reviews = data?.content ?? [];

      // Суммируем лайки со всех рецензий
      const totalLikes = reviews.reduce(
        (sum: number, review: { likesCount: number }) => sum + (review.likesCount ?? 0),
        0
      );

      return {
        totalReviews: data?.totalElements ?? reviews.length,
        totalLikes,
      };
    },
    enabled: !!userId && !!token,
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}
