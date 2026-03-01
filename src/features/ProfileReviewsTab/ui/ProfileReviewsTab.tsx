"use client";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown, Plus } from "lucide-react";
import React, { useState, type SetStateAction } from "react";

export const ProfileReviewsTab = () => {
  const [selectedOption, setSelectedOption] = useState({
    label: "Все рецензии",
    value: "all",
  });

  const options = [
    { label: "Все рецензии", value: "all" },
    { label: "Недавние", value: "recent" },
    { label: "Популярные", value: "popular" },
  ];

  const handleSelect = (
    option: SetStateAction<{ label: string; value: string }>,
  ) => {
    setSelectedOption(option);
  };

  return (
    <div className="pt-2">
      <div className="bg-glass flex items-center border border-frostedglass justify-between rounded-2xl p-7">
        <div className="flex flex-col gap-3">
          <p className="text-white text-2xl font-bold">Мои рецензии</p>
          <p className="text-grey">Всего написано 1 рецензий</p>
        </div>
        <div>
          <div className="flex gap-4">
            <div>
              <Menu>
                <MenuButton className="bg-frostedglass border-grey flex w-40 justify-center items-center gap-1 rounded-xl border-2 py-2 text-white">
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
            <button className="from-lightorange to-darkorange flex center gap-1 rounded-xl bg-gradient-to-r transition-all hover:scale-103 cursor-pointer py-2 px-3 text-white">
              <Plus />
              <p>Написать</p>
            </button>
          </div>
        </div>
      </div>
      <div className="pt-6">
      </div>
    </div>
  );
};
