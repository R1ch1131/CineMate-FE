import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Test from "~/shared/assets/icons/test.jpg";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

return (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-shadow bg-opacity-50"
    onClick={handleButtonClick}
  >
    <div
      ref={popupRef}
      className="flex h-5/6 w-10/12 flex-col overflow-hidden rounded-2xl border-1 border-gray-600 bg-[#0f172a] shadow-lg md:w-8/12 lg:w-7/12"
      onClick={handlePopupClick}
    >
      {/* Верхняя часть с фоновым изображением и кнопкой закрытия поверх */}
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={Test}
          alt="Background"
          fill
          className="object-cover rounded-t-2xl"
          style={{ objectPosition: "center center" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-[85%] bg-gradient-to-t from-[#0f172a] to-transparent" />
        
        {/* Кнопка закрытия поверх изображения */}
        <div className="absolute right-4 top-4">
          <button
            onClick={handleButtonClick}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-xl text-white transition-colors hover:bg-gray-700"
          >
            ×
          </button>
        </div>
      </div>

      {/* Основной контент */}
      <div className="flex px-6">
          <div className="flex gap-4">
            <div className="h-40 w-28 overflow-hidden rounded-2xl border-2 border-gray-600 shadow-2xl">
              <Image
                src={Test}
                alt="Poster"
                width={112}
                height={160}
                className="h-full w-full object-cover"
              />
             
            </div>
             <p className="text-white  text-4xl font-bold">Дюна часть вторавя</p>
          </div>
        </div>
      </div>
    </div>
);
};
