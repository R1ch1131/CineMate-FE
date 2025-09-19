import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Test from "~/shared/assets/icons/test.jpg";
import { PopupTabs } from "~/widgets/PopupTabs";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";


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
      className="fixed inset-0 z-50 flex items-center justify-center bg-shadow"
      onClick={handleButtonClick}
    >
      <div
        ref={popupRef}
        className="flex h-11/12 w-1/2 flex-col overflow-hidden rounded-2xl border border-gray-600 bg-[#0f172a] shadow-lg"
        onClick={handlePopupClick}
      >

        <div className="relative h-5/12 w-full">
          <Image
            src={Test}
            alt="Background"
            fill
            className="rounded-t-2xl object-cover"
            style={{ objectPosition: "center center" }}
          />
          <div className="absolute bottom-0 left-0 right-0 h-3/4 bg-gradient-to-t from-[#0f172a] to-transparent" />
          <div className="absolute top-4 right-4">
            <button
              onClick={handleButtonClick}
              className="flex h-8 2k:h-12 w-8 2k:w-12 items-center justify-center rounded-full bg-gray-800 text-xl text-white transition-colors hover:bg-gray-700"
            >
              ×
            </button>
          </div>
          <div className="absolute bottom-4 left-6 flex items-end">
            <div className="mr-4 h-40 2k:h-60 w-28 2k:w-42 overflow-hidden rounded-xl border-2 border-gray-600 shadow-2xl">
              <Image
                src={Test}
                alt="Poster"
                width={300}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="mb-2">
              <h2 className="text-3xl font-bold text-white">Дюна: Часть вторая</h2>
              <div className="mt-2 flex items-center">
                <span className="text-lightorange mr-4 text-xl font-bold">8.7 / 10</span>
                <span className="text-gray-300">1.2K рецензий</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <PopupTabs />
        </div>
      </div>
    </div>
  );
};