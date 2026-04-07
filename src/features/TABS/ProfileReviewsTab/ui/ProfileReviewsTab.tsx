"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, Plus, Loader2 } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ReviewCols } from "~/widgets/ReviewPage/ui/ReviewCols"; // Путь к твоему компоненту

export const ProfileReviewsTab = () => {
  const { data: session } = useSession();
  const [selectedOption, setSelectedOption] = useState({ label: "Все рецензии", value: "all" });

  const { data, isLoading, isFetching, refetch } = useQuery({
    queryKey: ["my-reviews", selectedOption.value, session?.user?.id],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/api/reviews/user/${session?.user?.id}?page=0&size=100`;
      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken}`,
          Accept: "application/json"
        }
      });
      if (!res.ok) throw new Error("Ошибка загрузки");
      return res.json();
    },
    enabled: !!session?.user?.id,
    placeholderData: (previousData) => previousData,
  });

  const reviews = data?.content ?? [];

  return (
    <div className="pt-2">
      <div className="bg-glass flex items-center border border-frostedglass justify-between rounded-2xl p-7 mb-8">
        <div className="flex flex-col gap-3">
          <p className="text-white text-2xl font-bold">Мои рецензии</p>
          <p className="text-grey text-sm">Всего написано {data?.totalElements ?? 0}</p>
        </div>
        <div className="flex gap-4">
          {/* Твой селект сортировки */}
          <Menu as="div" className="relative">
            <MenuButton className="bg-frostedglass border-white/5 flex w-44 justify-between items-center gap-2 rounded-xl py-2.5 px-4 text-white">
              {selectedOption.label} <ChevronDown className="h-4 w-4" />
            </MenuButton>
            <MenuItems className="absolute right-0 mt-2 w-44 rounded-xl bg-[#1e212f] border border-white/10 p-1 z-50">
              {[{ label: "Все", value: "all" }, { label: "Недавние", value: "recent" }].map((opt) => (
                <MenuItem key={opt.value}>
                  <button onClick={() => setSelectedOption(opt)} className="w-full text-left rounded-lg px-3 py-2 text-sm text-white hover:bg-white/5">
                    {opt.label}
                  </button>
                </MenuItem>
              ))}
            </MenuItems>
          </Menu>
          <button className="bg-gradient-to-r from-lightorange to-darkorange flex items-center gap-2 rounded-xl px-5 text-white font-medium hover:scale-105 transition-all">
            <Plus className="h-5 w-5" /> Написать
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Loader2 className="animate-spin text-lightorange" size={40} /></div>
      ) : (
        <div className="relative">
          {isFetching && !isLoading && (
            <div className="absolute -top-7 right-0 flex items-center gap-2 text-[11px] text-lightorange font-bold uppercase tracking-tighter animate-pulse">
              <Loader2 size={12} className="animate-spin" />
              Обновление данных...
            </div>
          )}
          <ReviewCols reviews={reviews} onActionSuccess={() => void refetch()} />
        </div>
      )}
    </div>
  );
};