import React, { useState } from "react";
import { Popup } from "~/widgets/Popup/ui/Popup";
import Image from "next/image";
import Message from '~/shared/assets/icons/message.png';
import Test from '~/shared/assets/icons/test.jpg';

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
        <div className="h-62 w-40 rounded-2xl overflow-hidden relative">
          <Image
            src={Test}
            alt="Film poster"
            fill
            className="object-cover"
          />
        </div>
        <div className="p-1 text-white">
          <p>Дюна: часть вторая</p>
          <div className="flex justify-between">
            <p className="">2024</p>
            <div className="flex justify-center items-center gap-1">
              <Image 
                style={{
                  filter: 'invert(1) hue-rotate(180deg)'
                }} 
                src={Message} 
                width={16} 
                alt="message icon"
              />
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