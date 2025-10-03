// features/MyList/ui/MyList.tsx
"use client";

import React, { useState } from "react";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react";
import { Grid3x3, List, Plus } from "lucide-react";
import { MyListHeader } from "./MyListHeader";
import { SearchBar } from "./SearchBar";
import { SortMenu } from "./SortMenu";
import { FilmGrid } from "~/features/FilmMyList";
import { TABS, TAB_STYLE } from "../lib/constants";

export const MyList = () => {
  
  const [selectedOption, setSelectedOption] = useState({
    label: "Дата добавления",
    value: "date",
  });

  const [films] = useState([
    { title: "Дюна: Часть вторая", rating: 8.4, year: 2023, status: "want" },
    { title: "Фильм 2", rating: 7.5, year: 2021, status: "watching" },
    { title: "Фильм 3", rating: 9.0, year: 2020, status: "watched" },
    { title: "Фильм 4", rating: 6.5, year: 2019, status: "delayed" },
  ]);

  const [selectedTab, setSelectedTab] = useState<number>(0);

  const filteredFilms = React.useMemo(() => {
    const tab = TABS[selectedTab]!;
    if (tab.status === "all") return films;
    return films.filter((f) => f.status === tab.status);
  }, [selectedTab, films]);

  return (
    <div>
      <MyListHeader />
      <div className="center flex">
        <div className="w-7/12">
          <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
            <TabList className="bg-glass mb-10 flex h-15 items-center rounded-xl">
              {TABS.map((tab, i) => (
                <Tab key={tab.status} className={TAB_STYLE}>
                  <span className="flex gap-2">
                    <tab.icon className="h-5 w-5" />
                    <p>
                      {tab.label} (
                      {tab.status === "all"
                        ? films.length
                        : films.filter((f) => f.status === tab.status).length}
                      )
                    </p>
                  </span>
                </Tab>
              ))}
            </TabList>
            <div className="bg-glass flex flex-col gap-6 rounded-2xl p-6">
              <SearchBar />
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <SortMenu
                    selectedOption={selectedOption}
                    onSelect={setSelectedOption}
                  />
                  <div className="bg-glass flex h-8 w-8 items-center justify-center rounded-lg">
                    <Grid3x3 className="text-grey/60 h-5 w-5" />
                  </div>
                  <div className="bg-glass flex h-8 w-8 items-center justify-center rounded-lg">
                    <List className="text-grey/60 h-5 w-5" />
                  </div>
                </div>
                <div className="flex items-center gap-5">
                  <p className="text-grey">
                    Найдено{" "}
                    <span className="text-white">{filteredFilms.length}</span>{" "}
                    фильма
                  </p>
                  <div className="bg-gradient flex items-center justify-center gap-1 rounded-xl p-2">
                    <Plus className="h-4 w-4" />
                    <p>Добавить фильм</p>
                  </div>
                </div>
              </div>
            </div>
            <TabPanels>
              {TABS.map((_, i) => (
                <TabPanel key={i}>
                  <FilmGrid films={filteredFilms} />
                </TabPanel>
              ))}
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </div>
  );
};
