"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { ReviewCols, type Review } from "~/widgets/ReviewPage/ui/ReviewCols";
import { useAvatarMap } from "~/shared/hooks/useAvatarMap";

export const PublicProfileReviewsTab = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id") ?? "";
  const { data: session } = useSession();
  const [selectedOption] = useState({ label: "Все рецензии", value: "all" });

  const { data, isLoading, isFetching, refetch } = useQuery<{ content: Review[]; totalElements?: number }>({
    queryKey: ["public-profile-reviews", userId],
    queryFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/reviews/user/${userId}?page=0&size=100`;
      const headers: HeadersInit = { Accept: "application/json" };
      if (session?.user?.accessToken) {
        headers.Authorization = `Bearer ${session.user.accessToken}`;
      }
      const res = await fetch(url, { headers });
      if (!res.ok) throw new Error("Ошибка загрузки");
      return res.json();
    },
    enabled: !!userId,
    placeholderData: (previousData) => previousData,
  });

  const reviews = data?.content ?? [];
  const avatarMap = useAvatarMap(reviews.map(r => r.userId).filter(Boolean) as string[]);

  if (!userId) {
    return <div className="text-center py-10 text-grey">Профиль не указан</div>;
  }

  return (
    <div className="pt-2 w-260 ">
      <div className="bg-glass flex items-center border border-frostedglass justify-between rounded-2xl p-7 mb-8">
        <div className="flex flex-col gap-3">
          <p className="text-white text-2xl font-bold">Рецензии пользователя</p>
          <p className="text-grey text-sm">Всего написано {data?.totalElements ?? 0}</p>
        </div>
        <Menu as="div" className="relative">
          <MenuButton className="bg-frostedglass border-white/5 flex w-44 justify-between items-center gap-2 rounded-xl py-2.5 px-4 text-white">
            {selectedOption.label} <ChevronDown className="h-4 w-4" />
          </MenuButton>
          <MenuItems className="absolute right-0 mt-2 w-44 rounded-xl bg-[#1e212f] border border-white/10 p-1 z-50">
            <MenuItem>
              <button className="w-full text-left rounded-lg px-3 py-2 text-sm text-white hover:bg-white/5">
                Все
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
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
          <ReviewCols reviews={reviews} avatarMap={avatarMap} onActionSuccess={() => void refetch()} />
        </div>
      )}
    </div>
  );
};