"use client";

import React, { useState } from "react";
import { Popup } from "~/widgets/Popup";
import Image from "next/image";
import FilmImage from "~/shared/assets/icons/filmImage.jpg";
import { Dot, MessageCircle, Star } from "lucide-react";
import { FilmGenre } from "~/shared/ui/FilmGenre";
import { Property } from "~/entities/Property";

export const FilmCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsPopupOpen(true);
  };

  const closePopup = () => setIsPopupOpen(false);

return (
  <>
    <div
      className="group cursor-pointer transition-transform hover:-translate-y-2.5 duration-400"
      onClick={openPopup} 
    >
      <div className="relative h-74">
        <Image
          src={FilmImage}
          alt="Film poster"
          fill
          className="object-cover rounded-2xl"
        />

        <div className={`absolute top-1/2 h-1/2 w-full rounded-b-2xl bg-gradient-to-t from-black/70 via-transparent to-transparent transition-opacity opacity-0 group-hover:opacity-100`}/>

        <div className="absolute inset-3 z-10">
          <div className="flex justify-between">
            <Property 
              text={"Новинка"} 
              color={"bg-green-500/80 !py-0 !px-0.5 !rounded-sm"} 
              textColor="!text-sm"
            />
            <div className="flex items-center py-1 px-2 bg-gray-700/80 rounded-sm gap-1">
              <Star className="h-4 w-4 text-lightorange fill-current"/>
              <p className="text-sm">8.7</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-1 pt-3 text-white">
        <p>Дюна: часть вторая</p>
        <div className="flex justify-between">
          <p className="">2024</p>
          <div className="flex items-center justify-center gap-1">
            <MessageCircle className="h-4 w-4" />
            <p>123</p>
          </div>
        </div>
        <div className="flex justify-between">
          <p className="text-sm">Дени Вильнев</p>
          <Dot />
          <FilmGenre genre={"Thriller"} />
        </div>
      </div>
    </div>
    {isPopupOpen && <Popup isOpen={isPopupOpen} onClose={closePopup} />}
  </>
);
};
