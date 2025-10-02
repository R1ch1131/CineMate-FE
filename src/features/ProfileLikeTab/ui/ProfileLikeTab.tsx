import { Heart, Star } from "lucide-react";
import React from "react";

export const ProfileLikeTab = () =>{
    return(
        <div className="pt-3">
            <div className="flex justify-between ">
            <p className="text-white font-bold text-3xl pb-6">Избранные рецензии</p>
            <p className="text-grey">1 Рецензия</p>
            </div>
            <div className="bg-glass border border-frostedglass rounded-2xl p-6 flex flex-col gap-2 text-grey">
                <div className="flex justify-between ">
                <p className="text-white">Дюна: Часть вторая</p>
                <span className="flex gap-2 items-center text-amber-500">
                    <Star className="fill-current h-6 w-6" />
                    <p className="font-bold">4.8</p>
                </span>
                </div>
                <span className="flex gap-1">
                    <p>Автор:</p>
                    <p>Анна Кинокритик</p>
                </span>
                <p>Невероятная кинематография и звуковое сопровождение...</p>
                <div>
                    <span className="flex gap-5">
                        <p>09.08.2024</p>
                        <div className="flex gap-1 items-center">
                            <Heart className="text-red-500 h-5 w-5"/>
                            <p>142 лайка</p>
                        </div>
                    </span>
                </div>
            </div>
        </div>
    )
}