import React, { useState } from "react";
import { Popup } from "~/widgets/Popup/ui/Popup";
import Image from "next/image";
import FilmImage  from "~/shared/assets/icons/filmImage.jpg";
import { MessageCircle } from 'lucide-react';

export const FilmCard = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setIsPopupOpen(true);
  };
  
  const closePopup = () => setIsPopupOpen(false);

  return(
    <>
      <div className="hover:-translate-y-1.5 transition-transform cursor-pointer" onClick={openPopup}>
        <div className="h-70 w-45 rounded-2xl overflow-hidden relative">
          <Image
            src={FilmImage}
            alt="Film poster"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-1 text-white">
          <p>Дюна: часть вторая</p>
          <div className="flex gap-22">
            <p className="">2024</p>
            <div className="flex justify-center items-center gap-1">
             <MessageCircle className="w-4 h-4" />
              <p>123</p>
            </div>
          </div>
          <p className="text-sm">Дени Вильнев</p>
        </div>
      </div>
      {isPopupOpen && (
        <Popup isOpen={isPopupOpen} onClose={closePopup} />
      )}
    </>
  ) 
};