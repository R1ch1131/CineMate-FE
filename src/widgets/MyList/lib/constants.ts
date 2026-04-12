import { Film, Target, Play, CircleCheckBig, Clock4 } from "lucide-react";

export const SORT_OPTIONS = [
  { label: "Дата добавления", value: "date" },
  { label: "Название", value: "name" },
  { label: "Год", value: "years" },
  { label: "Рейтинг", value: "rating" },
];

export const TABS = [
  { label: "Все", icon: Film, status: "all" },
  { label: "Хочу посмотреть", icon: Target, status: "WANT_TO_WATCH" },
  { label: "Смотрю", icon: Play, status: "WATCHING" },
  { label: "Просмотрено", icon: CircleCheckBig, status: "WATCHED" },
  { label: "Отложено", icon: Clock4, status: "POSTPONED" },
];

export const TAB_STYLE = "px-4 ml-3 py-2.5 2k:py-3.5 rounded-xl text-grey from-lightorange to-darkorange duration-200 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:text-white data-hover:bg-frostedglass data-selected:bg-gradient-to-r data-selected:text-white";
