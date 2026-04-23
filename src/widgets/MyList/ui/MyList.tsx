"use client";

import React, { useState, useMemo, useEffect } from "react";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { Plus, Loader2, Grid2x2, TextAlignJustify } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import { MyListHeader } from "./MyListHeader";
import { SearchBar } from "./SearchBar";
import { SortMenu } from "./SortMenu";
import { FilmGrid } from "~/features/FilmMyList";
import { TABS, TAB_STYLE, SORT_OPTIONS } from "../lib/constants"; 
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getPosterUrl } from "~/shared/lib/getPosterUrl";

export interface WatchlistItem {
  tmdbId: number;
  title: string;
  voteAverage: number;
  releaseDate: string;
  posterPath: string;
  posterUrl: string;
  status: string;
  addedDate: string;
}

interface WatchlistResponse {
  [status: string]: WatchlistItem[];
}

const fetchWatchlist = async (token?: string): Promise<WatchlistItem[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/watchlist/all`,
      {
        headers: {
          Authorization: `Bearer ${token ?? ""}`,
        },
      }
    );

    if (!res.ok) return [];

    const data: WatchlistResponse = await res.json();

    if (!data || typeof data !== "object") return [];

    return Object.values(data)
      .flat()
      .map((item) => ({
        ...item,
        posterUrl: getPosterUrl(item.posterPath),
      }));
  } catch (e) {
    console.error("watchlist error:", e);
    return [];
  }
};

export const MyList = () => {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  const [selectedTab, setSelectedTab] = useState(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      const index = TABS.findIndex((t) => t.status === tabParam);
      return index >= 0 ? index : 0;
    }
    return 0;
  });

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
    const tabStatus = TABS[index]?.status;
    if (tabStatus) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("tab", tabStatus);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  };

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      const index = TABS.findIndex((t) => t.status === tabParam);
      if (index >= 0) {
        setSelectedTab(index);
      }
    }
  }, [searchParams]);

  const [selectedOption, setSelectedOption] = useState(() => {
    return SORT_OPTIONS[0]!;
  });

  const currentStatus = TABS[selectedTab]?.status;

  const { data: rawData, isLoading, isFetching } = useQuery({
    queryKey: ["watchlist", "flat"],
    queryFn: () => fetchWatchlist(session?.user?.accessToken),
    enabled: status === "authenticated",
    placeholderData: (previousData) => previousData,
  });

  const handleRefresh = async () => {
    try {
      await queryClient.invalidateQueries({
        queryKey: ["watchlist"],
        refetchType: "active"
      });
      await queryClient.refetchQueries({
        queryKey: ["watchlist", "flat"],
        type: "active"
      });
    } catch (error) {
      console.error("Ошибка при обновлении:", error);
    }
  };

  const safeItems: WatchlistItem[] = Array.isArray(rawData) ? rawData : [];
  const sortedItems = useMemo(() => {
    return [...safeItems].sort((a, b) => {
      switch (selectedOption.value) {
        case "newest":
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
        
        case "oldest":
          return new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime();
        
        case "rating-high":
          return b.voteAverage - a.voteAverage;
        
        case "rating-low":
          return a.voteAverage - b.voteAverage;
        
        case "title-asc":
          return a.title.localeCompare(b.title);
        
        case "title-desc":
          return b.title.localeCompare(a.title);
        
        default:
          return new Date(b.addedDate).getTime() - new Date(a.addedDate).getTime();
      }
    });
  }, [safeItems, selectedOption]);

  const films = useMemo(() => {
    if (currentStatus === "all") return sortedItems;
    return sortedItems.filter((item) => item.status === currentStatus);
  }, [sortedItems, currentStatus]);

  const tabCounts = useMemo(() => {
    return TABS.map((tab) => {
      if (tab.status === "all") return sortedItems.length;
      return sortedItems.filter((i) => i.status === tab.status).length;
    });
  }, [sortedItems]);

  if (status === "loading") {
    return (
      <div className="flex justify-center py-40">
        <Loader2 className="animate-spin w-10 h-10 text-orange-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20">
      <MyListHeader />

      <div className="flex justify-center px-4">
        <div className="w-full max-w-[1280px]">
          <TabGroup selectedIndex={selectedTab} onChange={handleTabChange}>
            <TabList className="bg-glass mb-10 flex h-16 items-center rounded-2xl border border-white/5 p-1">
              {TABS.map((tab) => (
                <Tab key={tab.status} className={TAB_STYLE}>
                  <div className="flex items-center gap-1 px-3 py-1">
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </div>
                </Tab>
              ))}
            </TabList>

            <div className="bg-glass flex flex-col gap-6 rounded-3xl p-8 border border-white/5 mb-8">
              <SearchBar />

              <div className="flex flex-wrap justify-between items-center gap-4">
                <div className="flex items-center gap-4">
                  <SortMenu
                    selectedOption={selectedOption}
                    onSelect={setSelectedOption}
                  />

                  <div className="flex rounded-xl border border-white/10 bg-white/5 p-2">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`rounded-lg p-3 transition ${
                        viewMode === "grid"
                          ? "bg-amber-500 text-white"
                          : "text-gray-400 hover:bg-white/10"
                      }`}
                    >
                      <Grid2x2 className="h-5 w-5" />
                    </button>

                    <button
                      onClick={() => setViewMode("list")}
                      className={`rounded-lg p-3 transition ${
                        viewMode === "list"
                          ? "bg-amber-500 text-white"
                          : "text-gray-400 hover:bg-white/10"
                      }`}
                    >
                      <TextAlignJustify className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <p className="text-sm text-grey">
                    Найдено <span className="text-white font-bold">{films.length}</span> фильма
                  </p>

                  <Link href="/movies">
                    <button className="bg-gradient flex items-center gap-2 rounded-xl py-2.5 px-5 transition-all hover:opacity-90 active:scale-95 text-white font-medium shadow-lg shadow-orange-500/20">
                      <Plus className="h-4 w-4" />
                      Добавить фильм
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative">
              {isFetching && !isLoading && (
                <div className="absolute -top-7.5 right-0 flex items-center gap-2 text-[11px] text-lightorange font-bold uppercase tracking-tighter animate-pulse">
                  <Loader2 size={12} className="animate-spin" />
                  Обновление данных...
                </div>
              )}

              <TabPanels>
                {TABS.map((_, i) => (
                  <TabPanel key={i}>
                    {isLoading ? (
                      <div className="flex flex-col items-center py-20 gap-4">
                        <Loader2 className="animate-spin h-10 w-10 text-orange-400" />
                        <p className="text-gray-400 text-sm">Загружаем список...</p>
                      </div>
                    ) : films.length > 0 ? (
                      <FilmGrid viewMode={viewMode} films={films} onActionSuccess={handleRefresh} />
                    ) : (
                      <div className="bg-glass rounded-3xl py-20 text-center border border-dashed border-white/10">
                        <p className="text-gray-400">В этой категории пока пусто</p>
                      </div>
                    )}
                  </TabPanel>
                ))}
              </TabPanels>
            </div>
          </TabGroup>
        </div>
      </div>
    </div>
  );
};