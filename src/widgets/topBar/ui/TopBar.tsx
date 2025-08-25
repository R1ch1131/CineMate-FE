import React from "react";
import Link from "next/link";
import { AuthButton } from "~/shared/authButton/ui/authButton";

interface TopBarProps {
  activeLink?: string;
}

const activelinkClass  = "text-amber-600 transition-transform hover:-translate-y-1 duration-500 gradient-border active"
const hoverLinkClass = "hover:text-amber-600 transition-transform hover:-translate-y-1 duration-500 transition-colors duration-300 gradient-border"

export const TopBar = ({ activeLink = "/" }: TopBarProps) => {
  return (
    <div className="flex h-18 w-full items-center justify-between px-32 py-4 text-white">
      <div>
        <Link href="/" className="text-2xl font-bold text-amber-600">
          CineMate
        </Link>
      </div>
      <div className="flex gap-x-10">
        <Link href="/" className={` ${activeLink === "/" ? `${activelinkClass}` : `${hoverLinkClass}`}`}>
          Главная
        </Link>
        <Link href="/movies" className={`${activeLink === "/movies" ?  `${activelinkClass}` : `${hoverLinkClass}`}`}>
          Фильмы
        </Link>
        <Link href="/reviews" className={`${activeLink === "/reviews" ?  `${activelinkClass}` : `${hoverLinkClass}`}`}>
          Рецензии
        </Link>
        <Link href="/mylist" className={`${activeLink === "/mylist" ?  `${activelinkClass}` : `${hoverLinkClass}`}`}>
          Мой список
        </Link>
      </div>
      <div>
        <AuthButton  />
      </div>
    </div>
  );
};
