"use client";

import { Field, Input } from "@headlessui/react";
import { ChevronDown, Eye, Plus, Search } from "lucide-react";
import { FiltersReviews } from "~/features/FiltersReviews";
import { HotDebate } from "~/features/HotDebate";
import { Reviews } from "~/widgets/Reviews";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { useState, type SetStateAction } from "react";

export default function HomePage() {
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

  return (
    <main>
      <div className="flex flex-col items-center justify-center gap-4 pb-8">
        <span className="text-4xl font-bold text-white">Рецензии</span>
        <span className="flex flex-col items-center gap-1">
          <p className="text-grey">
            Читайте мнения других киноманов, делитесь своими впечатлениями и
          </p>
          <p className="text-grey">учавствуйте в обсуждениях</p>
        </span>
      </div>
      <div className="flex justify-center">
        <div className="flex w-4/6 gap-10">
          <div className="flex w-4/12 flex-col gap-5">
            <div className="from-lightorange to-darkorange flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r text-white">
              <Plus className="h-5 w-5" />
              <p>Написать рецензию</p>
            </div>
            <FiltersReviews />
            <HotDebate />
          </div>
          <div className="w-11/12">
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
                  <Eye className="text-lightorange" />
                  <p>Все рецензии</p>
                  <p>(5 рецензий)</p>
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-5 pt-5">
              <Reviews />
              <Reviews />
              <Reviews />
              <Reviews />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
