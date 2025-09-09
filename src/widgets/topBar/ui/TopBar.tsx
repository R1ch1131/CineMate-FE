import React from "react";
import Link from "next/link";
import { CONSTANTS } from '~/shared/lib/strings';
import { AuthButton } from "~/shared/ui/authButton/ui/authButton";
import Image from 'next/image';
import logoImage from '~/shared/assets/icons/cinemateLogo.svg';

interface TopBarProps {
  activeLink?: string;
}

const activelinkClass = "text-lightorange transition-transform hover:-translate-y-1 gradient-border active"
const hoverLinkClass = "hover:text-lightorange transition-transform hover:-translate-y-1 transition-colors gradient-border"

export const TopBar = ({ activeLink = "/" }: TopBarProps) => {
  return (
    <div className="flex h-22 w-full items-center justify-between px-32 py-4 text-white">
      <div>
        <Link href="/">
          <Image src={logoImage}  
            alt="Cinemate Logo"
            width={250} 
          />
        </Link>
      </div>
      <div className="flex w-full justify-center gap-x-10">
        <Link href="/" className={`${activeLink === "/" ? `${activelinkClass}` : `${hoverLinkClass}`}`}>
          {CONSTANTS.topBar.main}
        </Link>
        <Link href="/movies" className={`${activeLink === "/movies" ?  `${activelinkClass}` : `${hoverLinkClass}`}`}>
          {CONSTANTS.topBar.films}
        </Link>
        <Link href="/reviews" className={`${activeLink === "/reviews" ?  `${activelinkClass}` : `${hoverLinkClass}`}`}>
          {CONSTANTS.topBar.reviews}
        </Link>
        <Link href="/mylist" className={`${activeLink === "/mylist" ?  `${activelinkClass}` : `${hoverLinkClass}`}`}>
          {CONSTANTS.topBar.myList}
        </Link>
      </div>
      <div>
        <Link href="/auth">
          <AuthButton text="Вход"/>
        </Link>
      </div>
    </div>
  );
};
