"use client";

import { Field, Input } from "@headlessui/react";
import { BookOpen, ChevronDown, Eye, Search } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState, type SetStateAction } from "react";

interface SearchBarProps {
  reviewsCount: number;
  tabName : string
}
const getReviewsText = (count: number) => {
  if (count === 1) return 'рецензия';
  if (count >= 2 && count <= 4) return 'рецензии';
  return 'рецензий';
};


export const SearchBar: React.FC<SearchBarProps> = ({ reviewsCount, tabName }) => {
  const [selectedOption, setSelectedOption] = useState({
    label: "Новые",
    value: "new",
  });

  const options = [
    { label: "Новые", value: "new" },
    { label: "Популярные", value: "popular" },
    { label: "По рейтингу", value: "rating" },
  ];

  const handleSelect = (
    option: SetStateAction<{ label: string; value: string }>,
  ) => {
    setSelectedOption(option);
  };

  return(
    <div>
      <div className="bg-glass h-40 rounded-2xl p-8">
        <div className="flex items-center gap-3">
          <div className="w-full">
            <Field>
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Поиск по фильмам, авторам, тексту рецензий..."
                    className="outline-grey bg-frostedglass focus:outline-lightorange block w-full rounded-xl py-3 pl-12 text-sm/6 text-white outline-3"
                  />
                  <div className="absolute top-1/2 left-3.5 -translate-y-1/2 transform">
                    <Search className="text-white" />
                  </div>
                </div>
              </div>
            </Field>
          </div>
          <span className="text-grey">Сортировка:</span>
          <Menu>
            <MenuButton className="bg-frostedglass border-grey flex w-50 justify-center gap-1 rounded-xl border-2 py-3 text-white">
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
        </div>
        <div className="border-frostedglass w-full border-b py-3" />
        <div>
          <span className="text-grey flex items-center gap-2.5 pt-4">
            <BookOpen className="text-lightorange" />
            <p>{tabName}</p>
            <p>({reviewsCount} {getReviewsText(reviewsCount)})</p>
          </span>
        </div>
      </div>
    </div>
  );
};