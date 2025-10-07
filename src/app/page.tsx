"use client";

import { StatsBlock } from "~/entities/StatsBlock";
import { CONSTANTS } from "~/shared/lib/strings";
import { FilmCard } from "~/entities/FilmCard/ui/FilmCard";
import Link from "next/link";
import { BookOpen, Flame, Newspaper } from "lucide-react";
import { Property } from "~/entities/Property";
import { SideBar } from "~/features/SideBar";
import { Reviews } from "~/features/Reviews";

export default function HomePage() {
  return (
    <main>
      <div className="flex flex-col items-center gap-8">
        <div className="flex items-center justify-center gap-3">
          <Newspaper className="h-8 w-8 text-amber-500" />
          <p className="text-lightorange text-2xl">{CONSTANTS.mainPage.news}</p>
        </div>
        <p className="text-5xl font-bold">
          <span className="text-white">{CONSTANTS.mainPage.all} </span>
          <span className="gradient">{CONSTANTS.mainPage.cinema}</span>
        </p>
        <div className="flex flex-col items-center justify-center gap-2 text-xl">
          <p className="text-grey">{CONSTANTS.mainPage.newRewiews}</p>
          <p className="text-grey">{CONSTANTS.mainPage.filmfan}</p>
        </div>
        <div className="pb-10 pt-7">
          <StatsBlock />
        </div>
        <div className="flex w-full max-w-7xl gap-8">
          <div className="flex flex-1 flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Flame className="h-8 w-8 text-red-500" />
                <p className="text-3xl font-bold text-white">Новинки кино</p>
                <Property
                  text={"Горячее"}
                  color={"bg-red-500/20"}
                  textColor="text-red-400"
                />
              </div>
              <Link href="/movies" className="hover:translate-x-1.5 transition-transform">
                <p className="text-lightorange">Смотреть все &gt;</p>
              </Link>
            </div>
            <div className="grid grid-cols-4 gap-6">
              <FilmCard />
              <FilmCard />
              <FilmCard />
              <FilmCard />
            </div>
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-green-500" />
                <p className="text-3xl font-bold text-white">Свежие рецензии</p>
                <Property
                  text={"Обновлено"}
                  color={"bg-green-500/20"}
                  textColor="text-green-400"
                />
              </div>
              <Link href="/reviews" className="hover:translate-x-1.5 transition-transform">
                <p className="text-lightorange">Все рецензии &gt;</p>
              </Link>
            </div>
            <div className="flex flex-col gap-5 py-5">
              <Reviews />
              <Reviews />
              <Reviews />
              <Reviews />
            </div>
          </div>
          <SideBar />
        </div>
      </div>
    </main>
  );
}
