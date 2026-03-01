'use client'

import React, { useState, type SetStateAction } from "react";
import Image from "next/image";
import Film1 from '~/shared/assets/icons/filmImage.jpg'
import { ChevronDown, CircleCheckBig, Clock4, Dot, Play, Star, Target, Trash2, type LucideIcon } from "lucide-react";
import { FilmMyListStatus } from "./FilmMyListStatus";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import type {Film} from './FilmGrid'

interface FilmMyListProps {
  film: Film;
  onDelete: () => void;
}

export const FilmMyList: React.FC<FilmMyListProps> = ({ film, onDelete }) => {
  const [selectedOption, setSelectedOption] = useState({
    label: "Хочу посмотреть",
    value: "want",
    color: "text-blue-300 border-blue-500 bg-blue-500/40",
    icon: Target
  });

  const [isActive, setIsActive] = useState(false);

  const options = [
    { label: "Хочу посмотреть", value: "want", color: "text-blue-300 border-blue-500 bg-blue-500/40" , icon: Target},
    { label: "Смотрю", value: "watching", color: "text-green-300 border-green-500 bg-green-500/40", icon: Play },
    { label: "Просмотрено", value: "watched", color: "text-purple-300 border-purple-500/70 bg-purple-500/40", icon: CircleCheckBig },
    { label: "Отложенно", value: "delayed", color: "text-red-300 border-red-500 bg-red-500/40", icon :Clock4 },
  ];

  const handleSelect = (
    option: SetStateAction<{ label: string; value: string; color: string; icon: LucideIcon }>
  ) => {
    setSelectedOption(option);
  };

  return (
    <div
      className="relative transition-all hover:scale-103"
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
    >
      <Image
        className="h-88 w-58 rounded-2xl object-cover mb-3"
        src={Film1}
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
          <FilmMyListStatus icon={selectedOption.icon} text={selectedOption.label} color={selectedOption.color} />
        </div>
        <div>
          <span className="text-grey flex gap-1">
            <p>Добавлен</p>
            <p>08.08.2024</p>
          </span>
        </div>
      </div>

      <div className="absolute top-4 left-4">
        <FilmMyListStatus icon={selectedOption.icon} text={selectedOption.label} color={selectedOption.color} />
      </div>
    <div className="absolute top-68 left-0">
      <Menu >
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

              <button
              onClick={onDelete}
                 className="h-9 w-9 flex center bg-red-500 rounded-full">
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </Menu>
    </div>
    </div>
  );
};
