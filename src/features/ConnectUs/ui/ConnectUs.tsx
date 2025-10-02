import { Coffee } from "lucide-react";
import React from "react";

export const ConnectUs = () =>{
    return(
        <div className="bg-amber-500/20 border border-amber-600/40 rounded-2xl p-7 text-center" >
            <Coffee className="text-lightorange h-14 w-14 mx-auto mb-6"/>
            <p className="text-white font-bold pb-3">Присоединяйтесь к обсуждению</p>
            <span>
                <p className="text-grey text-sm">Делитесь мнениями, читайте рецензии и находите </p>
                <p className="text-grey pb-3">новые фильмы</p>
            </span>
            <div className="bg-gradient-to-r from-lightorange to-darkorange rounded-2xl h-12">
                <p className="text-white pt-2.5">Регистрация бесплатно</p>
            </div>
        </div>
    )
}