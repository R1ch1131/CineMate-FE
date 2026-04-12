"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { HotDebate } from "./HotDebate";
import { SearchBar } from "./SearchBar";
import { ReviewForm } from "./ReviewForm";
import { ReviewCols } from "./ReviewCols";
import type { Review } from "./ReviewCols";
import { REVIEW_TABS } from "../lib/constants";
import { useAvatarMap } from "~/shared/hooks/useAvatarMap";


interface ReviewsResponse {
  content: Review[];
  totalElements: number;
  totalPages?: number;
  size?: number;
  number?: number;
}

export const ReviewPage = () => {
  const { data: session, status } = useSession();
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt,desc");
  const queryClient = useQueryClient();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [searchQuery]);

  const currentTab = REVIEW_TABS[activeTab] ?? REVIEW_TABS[0];

  const { data, isLoading, isFetching } = useQuery<ReviewsResponse>({
    queryKey: ["reviews", activeTab, session?.user?.id, debouncedQuery, sortBy],
    queryFn: async () => {
      let url: string;

      if (debouncedQuery.trim()) {
        const isUserSearch = debouncedQuery.startsWith('@');
        const query = isUserSearch ? debouncedQuery.slice(1) : debouncedQuery;
        
        if (isUserSearch) {
          url = `${process.env.NEXT_PUBLIC_API_URL}/reviews/search/user?username=${encodeURIComponent(query.trim())}&page=0&size=20&sort=${sortBy}`;
        } else {
          url = `${process.env.NEXT_PUBLIC_API_URL}/reviews/search/movie?title=${encodeURIComponent(query.trim())}&page=0&size=20&sort=${sortBy}`;
        }
      } else {
        const tab = REVIEW_TABS[activeTab];
        if (!tab) throw new Error("Таб не найден");

        if (tab.id === "my" && session?.user?.id) {
          url = `${process.env.NEXT_PUBLIC_API_URL}/reviews/user/${session.user.id}?page=0&size=20&sort=${sortBy}`;
        } else {
          url = `${process.env.NEXT_PUBLIC_API_URL}${tab.endpoint}?page=0&size=20&sort=${sortBy}`;
        }
      }

      const response = await fetch(url, {
        headers: {
          "Accept": "application/json",
          ...(session?.user?.accessToken && {
            "Authorization": `Bearer ${session.user.accessToken}`,
          }),
        },
      });

      if (!response.ok) throw new Error("Ошибка загрузки");

      return (await response.json()) as ReviewsResponse;
    },
    enabled: status !== "loading",
    placeholderData: (previousData) => previousData,
  });

  const handleRefresh = async () => {
  try {
    await queryClient.invalidateQueries({
      queryKey: ["reviews"],
      refetchType: "active"
    });
    await queryClient.refetchQueries({
      queryKey: ["reviews", activeTab, session?.user?.id, debouncedQuery, sortBy],
      type: "active"
    });
    console.log("Данные успешно обновлены");
  } catch (error) {
    console.error("Ошибка при обновлении:", error);
  }
};

  const reviews = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;
  const avatarMap = useAvatarMap(reviews?.map(r => r.userId) ?? []);

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "createdAt,desc") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    if (sortBy === "likesCount,desc") {
      return (b.likesCount ?? 0) - (a.likesCount ?? 0);
    }
    if (sortBy === "rating,desc") {
      return (b.rating ?? 0) - (a.rating ?? 0);
    }
    return 0;
  });

  return (
    <div className="min-h-screen">
      <div className="flex justify-center px-4 pt-10">
        <div className="flex w-full lg:w-4/6 gap-10">
          
          <div className="hidden md:flex w-4/12 flex-col gap-6">
            <ReviewForm onSuccess={handleRefresh} />
            
            <div className="bg-glass border border-frostedglass rounded-2xl p-6 shadow-xl">
               <ul className="flex flex-col gap-2">
                {REVIEW_TABS.map((tab, index) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(index)}
                      className={`w-full py-3 px-4 transition-all rounded-xl flex items-center gap-3 ${
                        activeTab === index ? "bg-lightorange text-white" : "text-gray-400 hover:bg-white/5"
                      }`}
                    >
                      {tab.icon} <span className="text-sm font-medium">{tab.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <HotDebate />
          </div>

          <div className="w-full md:w-8/12">
            <SearchBar reviewsCount={totalElements} tabName={currentTab.name} searchQuery={searchQuery} onSearchChange={setSearchQuery} sortBy={sortBy} onSortChange={setSortBy} />
            
            <div className="mt-6 min-h-125 relative">
              {isFetching && !isLoading && (
                <div className="absolute -top-7.5 right-0 flex items-center gap-2 text-[11px] text-lightorange font-bold uppercase tracking-tighter animate-pulse">
                  <Loader2 size={12} className="animate-spin" />
                  Обновление данных...
                </div>
              )}

              {isLoading ? (
                <div className="flex justify-center py-32">
                  <Loader2 className="animate-spin text-lightorange" size={40} />
                </div>
              ) : (
                <ReviewCols reviews={sortedReviews} avatarMap={avatarMap} onActionSuccess={handleRefresh} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};