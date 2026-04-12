"use client";

import React, { useState, useMemo } from "react";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { Grid3x3, List, Plus, Loader2, Grid2x2, TextAlignJustify } from "lucide-react";
import { MyListHeader } from "./MyListHeader";
import { SearchBar } from "./SearchBar";
import { SortMenu } from "./SortMenu";
import { FilmGrid } from "~/features/FilmMyList";
import { TABS, TAB_STYLE } from "../lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { getPosterUrl } from "~/shared/lib/getPosterUrl";

const STATUS_MAP: Record<string, string> = {
  all: "all",
  WANT_TO_WATCH: "WANT_TO_WATCH",
  WATCHING: "WATCHING",
  WATCHED: "WATCHED",
  POSTPONED: "POSTPONED",
};

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
  const url = `${process.env.NEXT_PUBLIC_API_URL}/watchlist/all`;

  const res = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token ?? ""}`,
      "Accept": "application/json",
    },
  });

  if (!res.ok) throw new Error("Ошибка загрузки списка");
  
  const data: WatchlistResponse = await res.json();
  

  return Object.values(data).flat().map(item => ({
    ...item,
    posterUrl: getPosterUrl(item.posterPath),
  }));
};

export const MyList = () => {
   const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const toggleViewMode = () => setViewMode(prev => prev === "grid" ? "list" : "grid");
  const { data: session } = useSession();
  const [selectedOption, setSelectedOption] = useState({
    label: "Дата добавления",
    value: "date",
  });
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const currentTab = TABS[selectedTab];
  const clientStatus = currentTab?.status;

  const { data: allItems = [], isLoading } = useQuery({
    queryKey: ["watchlist"],
    queryFn: () => fetchWatchlist(session?.user?.accessToken),
    enabled: !!session?.user?.accessToken,
  });

  const films = useMemo<WatchlistItem[]>(() => {
    if (!allItems || allItems.length === 0) return [];
    if (clientStatus === "all") return allItems;

    return allItems.filter((item: WatchlistItem) => item.status === clientStatus);
  }, [allItems, clientStatus]);

  return (
    <div className="min-h-screen pb-20">
      <MyListHeader />

      <div className="flex justify-center px-4">
        <div className="w-full max-w-[1280px] ">

          <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
            <TabList className="bg-glass mb-10 flex h-16 items-center rounded-2xl border border-white/5 p-1">
              {TABS.map((tab, i) => {
                const count = tab.status === "all"
                  ? allItems.length
                  : allItems.filter((item: WatchlistItem) => item.status === tab.status).length;

                return (
                  <Tab key={tab.status} className={TAB_STYLE}>
                    <div className="flex items-center gap-1 px-3 py-1">
                      <tab.icon className="h-4 w-4" />
                      <span className="text-">
                        {tab.label}
                      </span>
                      <span className="ml-1 text-white/80 px-3 py-0.5 rounded-lg">
                        {isLoading ? "..." : count}
                      </span>
                    </div>
                  </Tab>
                );
              })}
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
                      onClick={toggleViewMode}
                      className={`rounded-lg p-3 transition ${
                        viewMode === "grid"
                          ? "bg-amber-500 text-white"
                          : "text-gray-400 hover:bg-white/10"
                      }`}
                    >
                      <Grid2x2  className="h-5 w-5" />
                    </button>

                    <button
                      onClick={toggleViewMode}
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

                  <Link href='/movies'>
                    <button className="bg-gradient flex items-center gap-2 rounded-xl py-2.5 px-5 transition-all hover:opacity-90 active:scale-95 text-white font-medium shadow-lg shadow-orange-500/20">
                      <Plus className="h-4 w-4" />
                      Добавить фильм
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <TabPanels>
              {TABS.map((_, i) => (
                <TabPanel key={i} className="outline-none">
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                      <Loader2 className="animate-spin text-lightorange h-10 w-10" />
                      <p className="text-grey animate-pulse text-sm">Загружаем ваш список...</p>
                    </div>
                  ) : films.length > 0 ? (
                    <FilmGrid viewMode={viewMode} films={films} />
                  ) : (
                    <div className="bg-glass rounded-3xl py-20 text-center border border-dashed border-white/10">
                      <p className="text-grey">В этой категории пока пусто</p>
                    </div>
                  )}
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>

        </div>
      </div>
    </div>
  );
};
