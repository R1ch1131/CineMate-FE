"use client";

import { Field, Input, Menu, MenuButton, MenuItem, MenuItems, Tab, TabGroup, TabList, TabPanel, TabPanels,} from "@headlessui/react";
import { Bookmark, ChevronDown, CircleCheckBig, Clock4, Film, Grid3x3, List, Play, Plus, Search, Target} from "lucide-react";
import React, { useState, type SetStateAction } from "react";
import { Componovka } from "~/features/FilmMyList";
// import { UnauthorizedMyList } from "~/features/UnauthorizedMyList";

const tabStyle =
  "px-5 ml-3 py-2.5 2k:py-3.5 rounded-xl text-grey from-lightorange to-darkorange duration-200 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:text-white data-hover:bg-frostedglass data-selected:bg-gradient-to-r data-selected:text-white";

export default function HomePage() {
  const [selectedOption, setSelectedOption] = useState({
    label: "Дата добавления",
    value: "date",
  });

  const options = [
    { label: "Дата добавления", value: "date" },
    { label: "Название", value: "name" },
    { label: "Год", value: "years" },
    { label: "Рейтинг", value: "rating" },
  ];

  const handleSelect = (
    option: SetStateAction<{ label: string; value: string }>,
  ) => {
    setSelectedOption(option);
  };

  return (
    // <div className="flex justify-center items-center h-[calc(100vh-200px)]">
    //   <UnauthorizedMyList />
    // </div>
    <div>
      <span className="flex center text-lightorange font-bold text-2xl gap-3">
        <Bookmark className="h-9 w-9" />
        <p>Мой список</p>
      </span>
      <span className="flex flex-col center text-7xl pt-6 font-bold gap-2">
        <p>Ваша личная</p>
        <p className="gradient">кинотека</p>
      </span>
      <span className="flex flex-col center pt-10 gap-4 text-xl">
        <p className="text-grey">
          Организуйте свои фильмы, отслеживайте прогресс просмотра и получайте
        </p>
        <p className="text-grey">персональные рекомендации</p>
      </span>
      <div className="flex center">
        <div className="w-7/12">
        <TabGroup className="py-8">
          <TabList className="bg-glass 2k:h-17 flex h-15 items-center rounded-xl mb-10">
            <Tab className={`${tabStyle}`}><span className="flex gap-2"> <Film className="h-5 w-5" /> <p className="flex gap-1">Все <p>(2)</p></p></span></Tab>
            <Tab className={`${tabStyle}`}><span className="flex gap-2"> <Target className="h-5 w-5" /> <p className="flex gap-1">Хочу посмотреть<p>(2)</p></p></span></Tab>
            <Tab className={`${tabStyle}`}><span className="flex gap-2"> <Play className="h-5 w-5" /> <p className="flex gap-1">Смотрю <p>(2)</p></p></span></Tab>
            <Tab className={`${tabStyle}`}><span className="flex gap-2"> <CircleCheckBig className="h-5 w-5" /> <p className="flex gap-1">Просмотренно <p>(2)</p></p></span></Tab>
            <Tab className={`${tabStyle}`}><span className="flex gap-2"> <Clock4 className="h-5 w-5" /> <p className="flex gap-1">Отложено <p>(2)</p></p></span></Tab>
          </TabList>
          <div className=" bg-glass rounded-2xl flex flex-col gap-6 p-6">
            
            <div>
              <Field >
                <div className="flex flex-col gap-2">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Поиск фильмов в вашем списке..."
                      className="outline-grey bg-frostedglass focus:outline-lightorange block w-full rounded-xl py-3 pl-12 text-sm/6 text-white outline-3"
                    />
                    <div className="absolute top-1/2 left-3.5 -translate-y-1/2 transform">
                      <Search className="text-white" />
                    </div>
                  </div>
                </div>
              </Field>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-3">
                <Menu>
                  <MenuButton className="bg-frostedglass border-grey flex w-55 justify-center gap-1 rounded-xl border-2 py-2">
                    {selectedOption.label}
                    <ChevronDown />
                  </MenuButton>
                  <MenuItems anchor="bottom">
                    {options.map((option) => (
                      <MenuItem key={option.value}>
                        <a
                          className="block data-focus:bg-blue-600"
                          onClick={() => handleSelect(option)}
                        >
                          {option.label}
                        </a>
                      </MenuItem>
                    ))}
                  </MenuItems>
                </Menu>
                <div className="bg-glass h-8 w-8 rounded-lg flex justify-center items-center ">
                  <Grid3x3 className="h-5 w-5 text-grey/60"/>
                </div>
                <div className="bg-glass h-8 w-8 rounded-lg flex justify-center items-center ">
                  <List className="h-5 w-5 text-grey/60"/>
                </div>
              </div>
              <div className="flex items-center gap-5">
                <p className="text-grey">Найдено <span className="text-white">3</span> фильма</p>
                <div className="flex bg-gradient rounded-xl items-center justify-center p-2 gap-1">
                  <Plus className="h-4 w-4"/>
                  <p>Добавить фильм</p>
                </div>
              </div>
            </div>
          </div>
          <TabPanels className="mt-3">
            <TabPanel><Componovka /></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
            <TabPanel></TabPanel>
          </TabPanels>
        </TabGroup>
        </div>
      </div>
    </div>
  );
}
