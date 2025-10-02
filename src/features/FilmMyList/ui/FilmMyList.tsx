'use client'

import React, { useState, type SetStateAction } from "react";
import Image from "next/image";
import Film from '~/shared/assets/icons/filmImage.jpg'
import { ChevronDown, Dot, Star, Target, Trash2 } from "lucide-react";
import { FilmMyListStatus } from "./FilmMyListStatus";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

interface FilmMyListProps {
  film: { title: string; rating: number; year: number };
}

export const FilmMyList: React.FC<FilmMyListProps> = ({ film }) => {
  const [selectedOption, setSelectedOption] = useState({
    label: "Хочу посмотреть",
    value: "date",
  });

  const [isActive, setIsActive] = useState(false);

  const options = [
    { label: "Дата добавления", value: "date" },
    { label: "Название", value: "name" },
    { label: "Год", value: "years" },
    { label: "Рейтинг", value: "rating" },
  ];

  const handleSelect = (
    option: SetStateAction<{ label: string; value: string }>
  ) => {
    setSelectedOption(option);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <Image
        className="h-88 w-57 rounded-2xl object-cover mb-3"
        src={Film}
        alt="Фильм"
      />
      <p>{film.title}</p>

      <div className="flex flex-col gap-2">
        <div className="flex">
          <span className="flex gap-1.5 text-lightorange">
            <Star className="fill-current" />
            <p>{film.rating}</p>
          </span>
          <span className="text-grey flex ">
            <Dot />
            <p>{film.year}</p>
          </span>
        </div>
        <div className="flex">
          <FilmMyListStatus icon={Target} text={"Хочу посмотреть"} />
        </div>
        <div>
          <span className="text-grey flex gap-1">
            <p>Добавлен</p>
            <p>08.08.2024</p>
          </span>
        </div>
      </div>

      <div className="absolute top-4 left-4">
        <FilmMyListStatus icon={Target} text={"Хочу посмотреть"} />
      </div>

      <Menu as="div" className="absolute top-68 left-0">
        {({ open }) => (
          <div
            className={`bg-black/40 rounded-b-2xl flex flex-col gap-2 
              transition-opacity p-1.5 ${isActive || open ? "opacity-100" : "opacity-0"}`}
          >
            <div className="flex">
              <span className="flex gap-1.5 center text-white">
                <Star className="text-lightorange fill-current h-5 w-5" />
                <p>{film.rating}</p>
              </span>
              <Dot className="text-grey" />
              <p className="text-grey">{film.year}</p>
            </div>

            <div className="flex gap-5">
              <MenuButton className="bg-frostedglass border-grey flex w-40 center gap-1 text-sm rounded-xl border-2 py-1">
                {selectedOption.label}
                <ChevronDown className="h-5 w-5" />
              </MenuButton>

              <MenuItems className="absolute top-full left-0 mt-1 bg-darkblue rounded-xl shadow-md z-10">
                {options.map((option) => (
                  <MenuItem key={option.value}>
                    {({ active }) => (
                      <button
                        className={`block px-4 py-1 text-sm w-full text-left ${
                          active ? "bg-blue-600 rounded-xl text-white" : ""
                        }`}
                        onClick={() => handleSelect(option)}
                      >
                        {option.label}
                      </button>
                    )}
                  </MenuItem>
                ))}
              </MenuItems>

              <div className="h-9 w-9 flex center bg-red-500 rounded-full">
                <Trash2 className="h-5 w-5" />
              </div>
            </div>
          </div>
        )}
      </Menu>
    </div>
  );
};
