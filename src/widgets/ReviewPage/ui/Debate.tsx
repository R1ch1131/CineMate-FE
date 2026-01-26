import React from "react";
import Image from "next/image";
import Actor from "~/shared/assets/icons/actor.jpg";
import { CornerUpLeft, Flag, Heart } from "lucide-react";

export const Debate = () => {
  return (
    <div className="bg-glass rounded-2xl px-5 py-3">
      <div className="flex gap-4">
        <Image
          className="h-9 w-9 rounded-full object-cover"
          src={Actor}
          alt={"actor"}
        />
        <p>Анна Иванова</p>
        <p className="text-sm text-gray-400">534 дн назад</p>
      </div>
      <div className="pl-14">
        <p>
          Я считаю, что "Дюна: Часть вторая" превзошла все ожидания! Визуальная
          составляющая просто невероятная, а игра Тимоти Шаламе наконец-то
          раскрылась в полной мере.
        </p>
        <div className="flex gap-3 pt-3">
          <button className="center bg-frostedglass flex gap-1 rounded-md px-2 py-1 text-sm">
            <Heart size={16} />
            <p>24</p>
          </button>
          <button className="center bg-frostedglass flex gap-1 rounded-md px-2 py-1 text-sm">
            <CornerUpLeft size={16} />
            <p>Отвеить</p>
          </button>
          <button className="hover:text-red-400">
            <Flag size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
