"use client";

import React from "react";
import Link from "next/link";
import { CONSTANTS } from "~/shared/lib/strings";
import { AuthButton } from "~/shared/ui/authButton/ui/authButton";
import Image from "next/image";
import logoImage from "~/shared/assets/icons/cinemateLogo.svg";
import { useActivePath } from "~/shared/lib/hooks/useActivePath";
import { useSession } from "next-auth/react";
import type { Session } from "next-auth";
import { ProfileButton } from "~/shared/ui/ProfileButton/ui/ProfileButton";

const HIDDEN_PATHS = ["/auth"];

const linkWrapper =
  "relative inline-flex items-center group cursor-pointer";

const textBase =
  "text-lg 2k:text-xl transition-all duration-200 ease-out";

const activeText = "text-lightorange -translate-y-1";
const inactiveText =
  "text-white group-hover:text-lightorange group-hover:-translate-y-1";

const underlineBase =
  "absolute left-0 -bottom-1 h-[2px] w-0 bg-lightorange transition-all duration-200 ease-out";

const underlineActive = "w-full";
const underlineInactive = "group-hover:w-full";

export const TopBar = () => {
  const { data: session } = useSession() as { data: Session | null };
  const activeLink = useActivePath();

  if (HIDDEN_PATHS.includes(activeLink)) {
    return null;
  }

  const renderLink = (href: string, label: string) => {
    const isActive = activeLink === href;

    return (
      <Link href={href} className={linkWrapper}>
        {/* текст — двигается, но hitbox стабильный */}
        <span
          className={`${textBase} ${
            isActive ? activeText : inactiveText
          }`}
        >
          {label}
        </span>

        {/* underline — отдельный слой */}
        <span
          className={`${underlineBase} ${
            isActive ? underlineActive : underlineInactive
          }`}
        />
      </Link>
    );
  };

  return (
    <div className="mb-5 flex h-22 w-full items-center justify-between px-32 py-4 text-white">
      <div className="flex-1">
        <Link href="/">
          <Image src={logoImage as string} alt="Cinemate Logo" width={250} />
        </Link>
      </div>

      <div className="flex flex-1 justify-center gap-x-10">
        {renderLink("/", CONSTANTS.topBar.main)}
        {renderLink("/movies", CONSTANTS.topBar.films)}
        {renderLink("/reviews", CONSTANTS.topBar.reviews)}
        {renderLink("/mylist", CONSTANTS.topBar.myList)}
      </div>

      <div className="flex flex-1 justify-end">
        {session ? (
          <ProfileButton />
        ) : (
          <Link href="/auth">
            <AuthButton text="Вход" />
          </Link>
        )}
      </div>
    </div>
  );
};