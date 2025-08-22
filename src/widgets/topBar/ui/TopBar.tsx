import React from "react";
import Link from "next/link";

export const TopBar = () => {
  return (
    <div className="text-white h-18 w-full px-32 flex justify-between items-center">
      <div>
        <Link href="/" className="text-amber-600 text-2xl font-bold">
          CineMate
        </Link>
      </div>
      <div className="flex gap-x-10">
        <Link href="/">Главная</Link>
        <Link href="/movies">Фильмы</Link>
        <Link href="/reviews">Рецензии</Link>
        <Link href="/mylist">Мой список</Link>
      </div>
      <div>
        <Link href="/profile">профиль</Link>
      </div>
    </div>
  );
};