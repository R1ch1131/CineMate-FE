'use client'

import { StatsBlock } from "~/entities/StatsBlock/ui/StatsBlock";
import { CONSTANTS } from "~/shared/lib/strings";
import { FilmCard } from "~/entities/FilmCard/ui/FilmCard";
import Link from "next/link";
import { BookOpen, Flame, Newspaper } from "lucide-react";
import { Property } from "~/entities/Property";
import { SideBar } from "~/features/SideBar";

export default function HomePage() {
  return (
    <main>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="flex justify-center items-center gap-3">
          <Newspaper className="w-8 h-8 text-amber-500" />
          <p className="text-lightorange text-2xl">{CONSTANTS.mainPage.news}</p>
        </div>
        <p className="text-5xl font-bold">
          <span className="text-white">{CONSTANTS.mainPage.all} </span>  
          <span className="gradient">{CONSTANTS.mainPage.cinema}</span>
        </p>
        <div className="flex flex-col justify-center items-center gap-2">
          <p className="text-grey">
            {CONSTANTS.mainPage.newRewiews}
          </p>
          <p className="text-grey">{CONSTANTS.mainPage.filmfan}</p>
        </div>
        <StatsBlock />
        <div className="flex items-center gap-96 justify-between">
          <div className="flex items-center gap-3">
         <Flame className="w-8 h-8 text-red-500" />
          <p className="text-white text-3xl font-bold">Новинки кино</p>
          <Property text={"Горячее"} color={"bg-red-500/20 text-red-400"} />
          </div>
           <Link href="/movies">
          <p className="text-lightorange">Смотреть все &gt;</p>
        </Link>
        </div>
        <div className="flex gap-5">
        <FilmCard />
        <FilmCard />
        <FilmCard />
        <FilmCard />
        </div>
        <div className="flex items-center gap-68 justify-between">
          <div className="flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-green-500" />
          <p className="text-white text-3xl font-bold">Свежие рецензии</p>
          <Property text={"Обновлено"} color={"bg-green-500/20 text-green-400"} />
          </div>
           <Link href="/reviews">
          <p className="text-lightorange">Все рецензии &gt;</p>
        </Link>
        </div>
        <div className="h-96">
        <SideBar />
        </div>
      </div>
    </main>
  );
}