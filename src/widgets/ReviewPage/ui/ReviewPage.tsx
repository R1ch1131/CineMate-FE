"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useQuery, useQueryClient } from "@tanstack/react-query"; 
import { Loader2 } from "lucide-react";
import { HotDebate } from "./HotDebate";
import { SearchBar } from "./SearchBar";
import { ReviewForm } from "./ReviewForm";
import { ReviewCols } from "./ReviewCols";
import type { Review } from "./ReviewCols"; 
import { REVIEW_TABS } from "../lib/constants";


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
  const queryClient = useQueryClient(); 

  // Получаем текущий таб безопасно
  const currentTab = REVIEW_TABS[activeTab] ?? REVIEW_TABS[0];

  const { data, isLoading, isFetching } = useQuery<ReviewsResponse>({
    queryKey: ["reviews", activeTab, session?.user?.id],
    queryFn: async () => {
      const tab = REVIEW_TABS[activeTab];
      if (!tab) throw new Error("Таб не найден");

      let url = `${tab.endpoint}?page=0&size=20`;
      
      if (tab.id === "my" && session?.user?.id) {
        url = `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/user/${session.user.id}?page=0&size=20`;
      } else {
        url = `${process.env.NEXT_PUBLIC_API_URL}${tab.endpoint}?page=0&size=20`;
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
    await queryClient.invalidateQueries({ queryKey: ["reviews"] });
    console.log("Данные успешно обновлены");
  } catch (error) {
    console.error("Ошибка при обновлении:", error);
  }
};

  const reviews = data?.content ?? [];
  const totalElements = data?.totalElements ?? 0;

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
            <SearchBar reviewsCount={totalElements} tabName={currentTab.name} />
            
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
                <ReviewCols reviews={reviews} onActionSuccess={handleRefresh} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};