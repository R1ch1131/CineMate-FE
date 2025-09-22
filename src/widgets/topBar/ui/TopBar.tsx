"use client";

import React from "react";
import Link from "next/link";
import { CONSTANTS } from "~/shared/lib/strings";
import { AuthButton } from "~/shared/ui/authButton/ui/authButton";
import Image from "next/image";
import logoImage from "~/shared/assets/icons/cinemateLogo.svg";
import { useActivePath } from "~/shared/lib/hooks/useActivePath";

const activelinkClass =
  "text-lightorange transition-transform hover:-translate-y-1 gradient-border active";
const hoverLinkClass =
  "hover:text-lightorange transition-transform hover:-translate-y-1 transition-colors gradient-border";

const HIDDEN_PATHS = ["/auth"];

export const TopBar = () => {
  const activeLink = useActivePath();

  if (HIDDEN_PATHS.includes(activeLink)) {
    return null;
  }
  return (
    <div className="mb-5 flex h-22 w-full items-center justify-between px-32 py-4 text-white">
      <div className="flex-1">
        <Link href="/">
          <Image src={logoImage} alt="Cinemate Logo" width={250} />
        </Link>
      </div>
      <div className="flex flex-1 justify-center gap-x-10">
        <Link
          href="/"
          className={`${activeLink === "/" ? `${activelinkClass}` : `${hoverLinkClass}`}`}
        >
          <p className="2k:text-xl text-lg">{CONSTANTS.topBar.main}</p>
        </Link>
        <Link
          href="/movies"
          className={`${activeLink === "/movies" ? `${activelinkClass}` : `${hoverLinkClass}`}`}
        >
          <p className="2k:text-xl text-lg">{CONSTANTS.topBar.films}</p>
        </Link>
        <Link
          href="/reviews"
          className={`${activeLink === "/reviews" ? `${activelinkClass}` : `${hoverLinkClass}`}`}
        >
          <p className="2k:text-xl text-lg">{CONSTANTS.topBar.reviews}</p>
        </Link>
        <Link
          href="/mylist"
          className={`${activeLink === "/mylist" ? `${activelinkClass}` : `${hoverLinkClass}`}`}
        >
          <p className="2k:text-xl text-lg">{CONSTANTS.topBar.myList}</p>
        </Link>
      </div>
      <div className="flex flex-1 justify-end">
        <Link href="/auth">
          <AuthButton text="Вход" />
        </Link>
      </div>
    </div>
  );
};
