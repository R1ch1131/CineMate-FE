import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Test from "~/shared/assets/icons/test.jpg";
import { PopupTabs } from "~/widgets/PopupTabs";
import { Property } from "~/shared/ui/Property";
import { Crown, Star, Bookmark, Play, Heart, Share2 } from "lucide-react";
import { PopupButton } from "~/shared/ui/PopupButton";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const useBodyScrollLock = (isLocked: boolean) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;

    if (isLocked) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalStyle;
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isLocked]);
};

export const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);

  useBodyScrollLock(isOpen);

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

  const handleWatchTrailerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveTab(2);
  };

  return (
    <div
      className="bg-shadow fixed inset-0 z-50 flex items-center justify-center"
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
          <div className="absolute right-0 bottom-0 left-0 h-3/4 bg-gradient-to-t from-[#0f172a] to-transparent" />
          <div className="absolute top-4 right-4">
            <button
              onClick={handleButtonClick}
              className="2k:h-12 2k:w-12 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-xl text-white transition-colors hover:bg-gray-700"
            >
              ×
            </button>
          </div>
          <div className="absolute bottom-4 left-6 flex items-end">
            <div className="2k:h-60 2k:w-42 mr-4 h-45 w-32 overflow-hidden rounded-xl border-2 border-gray-600 shadow-2xl">
              <Image
                src={Test}
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
                <h2 className="text-3xl font-bold text-white">
                  Дюна: Часть вторая
                </h2>
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
                    onClick={handleWatchTrailerClick}
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
        </div>
        <div className="invisible-scroll flex-1 overflow-y-auto p-6">
          <PopupTabs selectedIndex={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    </div>
  );
};