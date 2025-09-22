import React from "react";
import Image from "next/image";
import FilmImage  from "~/shared/assets/icons/filmImage.jpg";
import { Crown, Star, Bookmark, Play, Heart, Share2 } from "lucide-react";
import { PopupButton } from "~/shared/ui/PopupButton";
import { Property } from "~/entities/Property";

interface PopupHeaderProps {
  onTabChange?: (index: number) => void;
}

export const PopupHeader = ({ onTabChange }: PopupHeaderProps) => {
  const handleWatchTrailer = () => {
    if (onTabChange) {
      onTabChange(2);
    }
  };

  return (
    <div className="absolute bottom-4 left-6 flex items-end">
      <div className="2k:h-60 2k:w-42 mr-4 h-45 w-32 overflow-hidden rounded-xl border-2 border-gray-600 shadow-2xl">
        <Image
          src={FilmImage}
          alt="Poster"
          width={300}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="mb-2">
        <div className="2k:gap-4 flex flex-col gap-3">
          <div className="flex gap-2">
            <Property text={"2024"} color={"bg-orange-400"} />
            <Property
              text={"166 мин"}
              color={"bg-blue-500/40 border border-blue-500/50"}
            />
            <Property
              text={"TOP"}
              color={"bg-gradient-to-r from-lightorange to-darkorange"}
              icon={Crown}
            />
          </div>
          <h2 className="text-3xl font-bold text-white">Дюна: Часть вторая</h2>
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <Star className="fill-current text-amber-500" />
              <Star className="fill-current text-amber-500" />
              <Star className="fill-current text-amber-500" />
              <Star className="fill-current text-amber-500" />
              <Star className="fill-current text-amber-500" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lightorange mr-4 text-xl font-bold">
                8.7 / 10
              </span>
              <span className="mr-2 h-5 border-r border-amber-50"></span>
              <span className="text-gray-300">1.2K рецензий</span>
            </div>
          </div>
          <div className="flex gap-2">
            <Property
              text="Sci-Fi"
              color="bg-white/10 border border-white/20"
            />
            <Property
              text="Adventure"
              color="bg-white/10 border border-white/20"
            />
          </div>
          <div className="flex gap-3.5">
            <PopupButton
              icon={Play}
              text={"Смотреть трейлер"}
              color={"bg-lightorange text-white hover:bg-darkorange"}
              onClick={handleWatchTrailer}
            />
            <PopupButton
              icon={Bookmark}
              text={"В списке"}
              color={
                "bg-glass border border-frostedglass text-white hover:bg-frostedglass"
              }
            />
            <PopupButton
              icon={Heart}
              color={
                "bg-glass border border-frostedglass text-white text-white hover:bg-frostedglass"
              }
            />
            <PopupButton
              icon={Share2}
              color={
                "bg-glass border border-frostedglass text-white text-white hover:bg-frostedglass"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};