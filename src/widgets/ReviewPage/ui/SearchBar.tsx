"use client";

import { Field, Input } from "@headlessui/react";
import { BookOpen, Search, User, Film } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface SearchBarProps {
  reviewsCount: number;
  tabName: string;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

const getReviewsText = (count: number) => {
  if (count === 1) return 'рецензия';
  if (count >= 2 && count <= 4) return 'рецензии';
  return 'рецензий';
};

const SORT_OPTIONS = [
  { label: "Новые", value: "createdAt,desc" },
  { label: "Популярные", value: "likesCount,desc" },
  { label: "По рейтингу", value: "rating,desc" },
] as const;

export const SearchBar: React.FC<SearchBarProps> = ({
  reviewsCount,
  tabName,
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
}) => {
  const isUserSearch = searchQuery.startsWith('@');

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
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Название фильма или @username..."
                    className="outline-grey bg-frostedglass focus:outline-lightorange block w-full rounded-xl py-3 pl-12 pr-24 text-sm/6 text-white outline-3"
                  />
                  <div className="absolute top-1/2 left-3.5 -translate-y-1/2 transform">
                    <Search className="text-white" />
                  </div>
                  {/* Индикатор типа поиска */}
                  {searchQuery.length >= 2 && (
                    <div className={`absolute top-1/2 right-4 -translate-y-1/2 flex items-center gap-1.5 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                      isUserSearch 
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {isUserSearch ? (
                        <>
                          <User size={10} />
                          User
                        </>
                      ) : (
                        <>
                          <Film size={10} />
                          Film
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Field>
          </div>
          <span className="text-grey shrink-0">Сортировка:</span>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger className="w-[180px] rounded-xl border border-white/20 bg-white/10 px-5 py-6 text-left text-white transition-all duration-200 hover:bg-white/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="rounded-lg border border-white/20 bg-gray-700 text-left text-white transition-all duration-200">
              <SelectGroup>
                {SORT_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="block w-full px-4 py-1 text-left text-sm text-white transition-all duration-200 hover:bg-blue-600/20 focus-visible:rounded-xl focus-visible:bg-blue-600 focus-visible:text-white data-[state=checked]:bg-gray-800 data-[state=checked]:text-white"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
