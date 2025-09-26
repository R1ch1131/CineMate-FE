import { Bookmark } from "lucide-react";
import Link from "next/link";
import React from "react";

export const UnauthorizedMyList = () =>{
    return(
        <div className="flex justify-center items-center">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="bg-gradient-to-r from-lightorange to-darkorange rounded-3xl h-24 w-25 flex items-center justify-center">
            <Bookmark className="h-13 w-13 text-white"  />
            </div>
              <span className="text-white text-3xl font-bold">Войдите в аккаунт</span>
              <span className="text-grey">Создайте персональный список фильмов для </span>
              <span className="text-grey">просмотра</span>
              <Link href="/auth">
                <div className="py-4 px-7 bg-gradient-to-r flex items-center justify-center from-lightorange to-darkorange rounded-2xl">
                  <span className="text-white">Начать  сейчас</span>
                </div>
              </Link>
          </div>
        </div>
    )
}