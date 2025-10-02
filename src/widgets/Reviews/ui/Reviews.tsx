import React from "react";
import Image from "next/image";
import Film from "~/shared/assets/icons/filmImage.jpg";
import User from "~/shared/assets/icons/actor.jpg";
import Link from "next/link";
import { Property } from "~/entities/Property";
import {
  Bookmark,
  Calendar,
  Flag,
  Flame,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
  Star,
} from "lucide-react";

export const Reviews = () => {
  return (
    <div className="bg-glass border-frostedglass rounded-2xl border p-6">
      <div>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Image
              className="h-27 w-17 rounded-2xl object-cover"
              src={Film}
              alt={"фильм"}
            />
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-3">
                <p className="text-xl font-bold text-white">
                  Дюна: Часть вторая
                </p>
                <p className="text-grey">(2024)</p>
              </span>
              <div className="flex items-center gap-3">
                <Image
                  className="h-10 w-10 rounded-full object-cover"
                  src={User}
                  alt="user"
                />
                <Link href={"/profile"}>
                  <p className="text-white hover:text-lightorange">Анна Иванова</p>
                </Link>
                <Property
                  text={"Эксперт"}
                  color={"bg-lightorange"}
                  textColor="text-amber-200"
                />
              </div>
              <div className="text-grey flex gap-2">
                <div className="flex items-center gap-1">
                  <Calendar />
                  <p>414 дн назад</p>
                </div>
                <div className="flex gap-1">
                  <div className="bg-frostedglass flex items-center justify-center rounded-lg p-0.5 px-1.5">
                    <p>#sci-fi</p>
                  </div>
                  <div className="bg-frostedglass flex items-center justify-center rounded-lg p-0.5 px-1.5">
                    <p>#villeneuve</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 rounded-2xl bg-black/30 p-3.5 text-green-500">
              <Star className="fill-current" />
              <p className="text-lg font-bold">4.7</p>
            </div>
            <div className="flex justify-end">
              <div className="bg-frostedglass flex h-8 w-8 items-center justify-center rounded-full">
                <MoreHorizontal className="text-grey h-4 w-4" />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <p className="text-gray-300">
            Невероятная кинематография и звуковое сопровождение. Вильнёв создал
            поистине эпическое продолжение, которое превосходит первую часть.
            Тимоти Шаламе великолепно раскрывает характер Пола, а Зендея
            добавляет глубину истории.
          </p>
        </div>
        <div className="border-frostedglass mt-5 mb-3 w-full border-2" />
        <div className="flex justify-between">
          <div className="flex gap-5">
            <div className="bg-frostedglass text-grey flex items-center justify-center gap-1.5 rounded-xl p-2">
              <Heart width={17} />
              <p>142</p>
            </div>
            <div className="bg-frostedglass text-grey flex items-center justify-center gap-1.5 rounded-xl p-2">
              <MessageCircle width={17} />
              <p>23</p>
            </div>
            <div className="flex gap-2 rounded-xl bg-amber-500/30 px-2.5 py-2 text-amber-300">
              <Bookmark width={17} className="fill-amber-300" />
              <p>В избранном</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex gap-2 rounded-xl bg-amber-600/30 px-2.5 py-2 text-amber-600">
              <Flame width={17} className="fill-amber-600" />
              <p>В избранном</p>
            </div>
            <div className="bg-frostedglass text-grey flex h-10 w-10 items-center justify-center rounded-full">
              <Share2 width={17} />
            </div>
            <div className="bg-frostedglass text-grey flex h-10 w-10 items-center justify-center rounded-full">
              <Flag width={17} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
