import { Flame, Plus } from "lucide-react";
import React from "react";
import { Property } from "~/entities/Property";

export const ProfileDebateTab = () =>{
    return(
        <div>
            <span className="text-white flex justify-between items-center pt-2 pb-6">
                <p className="text-3xl font-bold">Мои споры</p>
                <div className="flex gap-1 bg-gradient-to-r from-lightorange to-darkorange rounded-xl p-2">
                    <Plus width={18}/>
                    <p>Создать спор</p>
                </div>
            </span>
            <div className="bg-glass p-5 border border-frostedglass rounded-2xl">
            <div className="flex justify-between items-center pb-2">
                <span className="flex gap-1 items-center">
                    <p className="text-white">Дюна vs Бегущий по лезвию: что лучше?</p>
                    <Property text={"Активный"} color={"bg-green-500/30"} textColor="text-green-500"/>
                </span>
                <Flame className="text-amber-600 h-5 w-5"/>
            </div>
            <span className="text-grey flex pb-4">
            <p>Автор:</p>
            <p>Вы</p>

            </span>
            <div className="text-grey flex justify-between px-35">
                <span className="flex flex-col justify-center items-center">
                    <p className="text-white">12</p>
                    <p>Участников</p>
                </span>
                 <span className="flex flex-col justify-center items-center">
                    <p className="text-white">45</p>
                    <p>Сообщений</p>
                </span>
                 <span className="flex flex-col justify-center items-center">
                    <p>2 часа назад</p>
                    <p>Последняя активность</p>
                </span>
            </div>
            </div>
        </div>
    )
}