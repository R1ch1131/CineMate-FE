"use client";

import React, { useState } from "react";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { Grid3x3, List, Plus, Loader2 } from "lucide-react";
import { MyListHeader } from "./MyListHeader";
import { SearchBar } from "./SearchBar";
import { SortMenu } from "./SortMenu";
import { FilmGrid } from "~/features/FilmMyList";
import { TABS, TAB_STYLE } from "../lib/constants";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";

const fetchWatchlist = async (token?: string, status?: string) => {
  // Формируем URL в зависимости от выбранной вкладки
  const url = status && status !== "all"
    ? `${process.env.NEXT_PUBLIC_API_URL}/api/watchlist/all?status=${status}`
    : `${process.env.NEXT_PUBLIC_API_URL}/api/watchlist/all`;

  const res = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token ?? ""}`,
      "Accept": "application/json",
    },
  });

  if (!res.ok) throw new Error("Ошибка загрузки списка");
  return res.json();
};

export const MyList = () => {
  const { data: session } = useSession();
  const [selectedOption, setSelectedOption] = useState({
    label: "Дата добавления",
    value: "date",
  });
  const [selectedTab, setSelectedTab] = useState<number>(0);

  const currentTab = TABS[selectedTab];
  const apiStatus = currentTab?.status;

  // Танстак Квери для получения данных
  const { data: films = [], isLoading, isRefetching } = useQuery({
    queryKey: ["watchlist", apiStatus],
    queryFn: () => fetchWatchlist(session?.user?.accessToken, apiStatus),
    enabled: !!session?.user?.accessToken,
  });

  return (
    <div className="min-h-screen pb-20">
      <MyListHeader />
      
      <div className="flex justify-center px-4">
        <div className="w-full max-w-[1200px] 2k:max-w-[1600px]">
          
          <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
            <TabList className="bg-glass mb-10 flex h-16 items-center rounded-2xl border border-white/5 p-1">
              {TABS.map((tab) => (
                <Tab key={tab.status} className={TAB_STYLE}>
                  <div className="flex items-center gap-2 px-4 py-2">
                    <tab.icon className="h-4 w-4" />
                    <span className="text-sm font-medium">
                      {tab.label}
                    </span>
                    <span className="ml-1 text-[10px] opacity-50 bg-white/10 px-1.5 rounded-full">
                      {isLoading && selectedTab === TABS.indexOf(tab) ? "..." : films.length}
                    </span>
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
                  <div className="flex gap-2">
                    <button className="bg-white/5 p-2 rounded-lg hover:bg-white/10 transition-colors">
                      <Grid3x3 className="text-grey/60 h-5 w-5" />
                    </button>
                    <button className="bg-white/5 p-2 rounded-lg hover:bg-white/10 transition-colors">
                      <List className="text-grey/60 h-5 w-5" />
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
                    <FilmGrid films={films} />
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