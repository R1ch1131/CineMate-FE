import React from "react";
import Image from "next/image";
import Film from '~/shared/assets/icons/film.png';
import Users from "~/shared/assets/icons/users.png";
import Rewiews from "~/shared/assets/icons/rewiews.png";
import { CONSTANTS } from "~/shared/lib/strings";

export const StatsBlock = () => {
  return (
    <div className="flex justify-center gap-7">
      <div className="bg-frostedglass border-glass flex h-34 w-58 flex-col items-center justify-center gap-1 rounded-2xl border text-white shadow-2xl">
        <Image
          className=""
          src={Film}
          style={{
            filter:
              "brightness(0) saturate(100%) invert(56%) sepia(93%) saturate(259%) hue-rotate(345deg) brightness(97%) contrast(92%)",
          }}
          width={40}
          alt="yt"
        />
        <p className="text-xl font-bold">43465</p>
        <p className="text-sm">{CONSTANTS.mainPage.statsBlock.film}</p>
        <p className="text-xs">{CONSTANTS.mainPage.statsBlock.estimate}</p>
      </div>
      <div className="bg-frostedglass border-glass flex h-34 w-58 flex-col items-center justify-center gap-1 rounded-2xl border text-white shadow-2xl">
        <Image
           style={{
            filter:
              "brightness(0) saturate(100%) invert(48%) sepia(79%) saturate(2476%) hue-rotate(86deg) brightness(118%) contrast(119%)",
          }}
          src={Rewiews}
          width={35}
          alt="yt"
        />
        <p className="text-xl font-bold">0</p>
        <p className="text-sm">{CONSTANTS.mainPage.statsBlock.rewiew}</p>
        <p className="text-xs">{CONSTANTS.mainPage.statsBlock.fromUsere}</p>
      </div>
      <div className="bg-frostedglass border-glass flex h-34 w-58 flex-col items-center justify-center gap-1 rounded-2xl border text-white shadow-2xl">
        <Image
           style={{
            filter:
              "brightness(0) saturate(100%) invert(15%) sepia(99%) saturate(6652%) hue-rotate(281deg) brightness(93%) contrast(101%)",
          }}
          src={Users}
          width={35}
          alt="yt"
        />
        <p className="text-xl font-bold">1</p>
        <p className="text-sm">{CONSTANTS.mainPage.statsBlock.user}</p>
        <p className="text-xs">{CONSTANTS.mainPage.statsBlock.register}</p>
      </div>
    </div>
  );
};
