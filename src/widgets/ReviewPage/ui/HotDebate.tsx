import { Flame } from "lucide-react";
import React from "react";

export const HotDebate = () =>{
    return(
        <div className="bg-glass border-frostedglass rounded-2xl border p-6">
            <div>
            <span className="flex gap-2 pb-3">
                <Flame className="text-red-500"/>
                <p className="text-white">Горячие обсуждения</p>
            </span>
            <div className="bg-frostedglass/70 rounded-xl p-3 hover:bg-frostedglass">
                <p className="text-white">Спор о Дюна: часть вторая</p>
                <span className="flex gap-4 text-grey ">
                <p>47 участников</p>
                <p>156 сообщений</p>
                </span>
            </div>
            </div>
        </div>
    )
}