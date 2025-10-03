import { Film, Target, Play, CircleCheckBig, Clock4 } from "lucide-react";

export const SORT_OPTIONS = [
  { label: "Дата добавления", value: "date" },
  { label: "Название", value: "name" },
  { label: "Год", value: "years" },
  { label: "Рейтинг", value: "rating" },
];

export const TABS = [
  { label: "Все", icon: Film, status: "all" },
  { label: "Хочу посмотреть", icon: Target, status: "want" },
  { label: "Смотрю", icon: Play, status: "watching" },
  { label: "Просмотрено", icon: CircleCheckBig, status: "watched" },
  { label: "Отложено", icon: Clock4, status: "delayed" },
];

export const TAB_STYLE = "px-5 ml-3 py-2.5 2k:py-3.5 rounded-xl text-grey from-lightorange to-darkorange duration-200 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:text-white data-hover:bg-frostedglass data-selected:bg-gradient-to-r data-selected:text-white";
