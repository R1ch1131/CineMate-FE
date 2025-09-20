import React from "react";
import { AwardItem } from "~/shared/ui/AwardItem";
import { DetailItem } from "~/shared/ui/DetailItem";
import { GlassBox } from "~/shared/ui/GlassBox";
import { StatBox } from "~/shared/ui/StatBox";
import { Award } from "lucide-react";

export const ViewTab = () => {
  return (
    <div className="relative text-white p-3 2k:p-5">
      <p className="mb-3 text-lg 2k:text-2xl font-bold">Описание</p>
      <div className="flex justify-between gap-5">
        <div className="flex flex-col w-2/3 gap-6">
          <div>
            <p className="2k:text-xl">Полномасштабная война за Арракис начинается. 
              Пол Атрейд принимает свою судьбу и бросает вызов Империи. 
              Объединившись с фрименами и взяв под контроль Великого Шелка, он ведёт их в эпическую битву против сил Императора и Харконненов.
               Революция неизбежна.</p>
          </div>
          <div>
            <p className="pb-4 text-lg 2k:text-2xl font-bold">Статистика</p>
            <div className="grid grid-cols-2 gap-4">
              <StatBox value="8.7" label="Рейтинг IMDb" color="text-lightorange"/>
              <StatBox value="95%" label="Rotten Tomatoes" color="text-green-500"/>
              <StatBox value="1.2к" label="Рецензий" color="text-purple-500" />
              <StatBox value="12.2к" label="В списке" color="text-red-500" />
            </div>
          </div>
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
            <AwardItem text="Оскар" icon={Award} classname='text-lightorange'/>
            <AwardItem text="BAFTA" icon={Award} classname='text-lightorange'/>
          </GlassBox>
        </div>
      </div>
    </div>
  );
};