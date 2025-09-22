import React from "react";
import { Actor } from "~/entities/Actor";
import { FilmCrew } from "~/entities/FilmCrew";

export const ActorTab = () => {
    return(
        <div className="text-white flex flex-col gap-6 p-3 2k:p-5">
            <p className="text-3xl font-bold ">Актеры и съемочная группа </p>
            <p  className="text-3xl font-bold">Главные роли</p>
            <div className="2k:gap-8 gap-10 grid grid-cols-4">
            <Actor/>
            <Actor/>
            <Actor/>
            <Actor/>
            </div>
            <p className="text-3xl font-bold">Съемочная группа</p>
            <div className="grid grid-cols-2 gap-4">
            <FilmCrew name="Дени Вильнев"  role="Режисер"/>
            <FilmCrew name="Мэри Пэрент, Кейл Борайтер"  role="Продюсер"/>
            <FilmCrew name="Грег Фрейзер"  role="Оператор"/>
            <FilmCrew name="Джон Спейтс, Дени Вильнёв"  role="Сценарист"/>
            <FilmCrew name="Ханс Циммер"  role="Композитор"/>
            <FilmCrew name="Джо Уокер"  role="Монтаж"/>
            </div>
        </div>
    )
}