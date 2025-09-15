'use client'

import { StatsBlock } from "~/shared/ui/StatsBlock/ui/StatsBlock";
import { TopBar } from "~/widgets/topBar/ui/TopBar";
import Image from "next/image";
import Paper from '~/shared/assets/icons/paper.png'
import { CONSTANTS } from "~/shared/lib/strings";
import { FilmCard } from "~/shared/ui/FilmCard/ui/FilmCard";
import Link from "next/link";
import Fire  from  '~/shared/assets/icons/fire.png'
import Reviews from '~/shared/assets/icons/rewiews.png'

export default function HomePage() {

  return (
    <main>
      <TopBar />
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="flex justify-center items-center gap-3">
          <Image width={30} style={{
            filter:
              "brightness(0) saturate(100%) invert(56%) sepia(93%) saturate(259%) hue-rotate(345deg) brightness(97%) contrast(92%)",
          }} src={Paper} alt=""/>
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
          <div className="flex items-center gap-2">
          <Image className="h-5 w-5" style={{filter: 'brightness(0) saturate(100%) invert(16%) sepia(99%) saturate(7404%) hue-rotate(4deg) brightness(95%) contrast(118%)'}} src={Fire}  alt="fire"/>
          <p className="text-white text-2xl font-bold">Новинки кино</p>
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
        <div className="flex items-center gap-84 justify-between">
          <div className="flex items-center gap-2">
          <Image className="h-5 w-5"  style={{
            filter:
              "brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)",
          }} src={Reviews}  alt="fire"/>
          <p className="text-white text-2xl font-bold">Свежие рецензии</p>
          </div>
           <Link href="/reviews">
          <p className="text-lightorange">Все рецензии &gt;</p>
        </Link>
        </div>
        <div className="h-96">

        </div>
      </div>
    </main>
  );
}