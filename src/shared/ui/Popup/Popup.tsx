import React, { useEffect, useRef } from "react";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
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

export const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  const popupRef = useRef<HTMLDivElement>(null);
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

  const handlePopupClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="bg-shadow fixed inset-0 z-50 flex center"
      onClick={onClose}
    >
      <div
        ref={popupRef}
        className="flex flex-col overflow-hidden rounded-2xl border border-gray-600 bg-[#0f172a] shadow-lg"
        onClick={handlePopupClick}
      >
        <div className="relative">
          <div className="absolute top-4 right-4">
            <button
              onClick={onClose}
              className="2k:h-12 2k:w-12 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 text-xl text-white transition-colors hover:bg-gray-700"
            >
              ×
            </button>
          </div>
        </div>
        <div className="invisible-scroll flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
