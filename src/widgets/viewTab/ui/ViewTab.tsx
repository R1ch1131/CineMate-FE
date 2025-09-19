import React from "react";
import { CreatorRow } from "~/shared/ui/CreatorRow";
import { DetailItem } from "~/shared/ui/DetailItem";
import { GlassBox } from "~/shared/ui/GlassBox";
import { StatBox } from "~/shared/ui/StatBox";

export const ViewTab = () => {
  return (
    <div className="relative text-white">
      <p className="mb-4 text-lg font-bold">Создатели</p>

      <div>
        <div className="flex justify-between gap-5">
          <div className="flex flex-col w-1/3">
            <CreatorRow role="Режиссер:" name="Дени Вильнёв" />
            <CreatorRow role="Продюсер:" name="Мэри Пэрент, Кейл Борайтер" />
            <CreatorRow role="Оператор:" name="Грег Фрейзер" />
          </div>
          <div className="flex flex-col w-1/3">
            <CreatorRow role="Сценарист:" name="Джон Спейтс, Дени Вильнёв" />
            <CreatorRow role="Композитор:" name="Ханс Циммер" />
            <CreatorRow role="Монтаж:" name="Джо Уокер" />
          </div>
          <div className="flex flex-col gap-4 w-1/3">
            <GlassBox title="Детали">
              <DetailItem label="Бюджет:" value="$165M" />
              <DetailItem label="Сборы:" value="$714M" />
              <DetailItem label="Премьера:" value="1 марта 2024" />
              <DetailItem label="Страна:" value="США, Канада" />
              <DetailItem label="Язык:" value="Английский" />
            </GlassBox>

            <GlassBox title="Награды">
              <p>Оскар</p>
              <p>BAFTA</p>
            </GlassBox>
          </div>
        </div>
      </div>

      <div className="absolute top-40">
        <p className="pb-4">Статистика</p>
        <div className="flex gap-5 2k:gap-4">
          <div className="flex flex-col gap-5 2k:gap-4">
            <StatBox
              value="8.7"
              label="Рейтинг IMDb"
              color="text-lightorange"
            />
            <StatBox
              value="95%"
              label="Rotten Tomatoes"
              color="text-green-500"
            />
          </div>
          <div className="flex flex-col gap-5 2k:gap-4">
            <StatBox value="1.2к" label="Рецензий" color="text-purple-500" />
            <StatBox value="12.2к" label="В списке" color="text-red-500" />
          </div>
        </div>
      </div>
    </div>
  );
};
