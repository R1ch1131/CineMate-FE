import { Coffee } from "lucide-react";
import Link from "next/link";
import React from "react";

export const ConnectUs = () =>{
    return(
        <div className="bg-amber-500/20 border border-amber-600/40 rounded-2xl p-7 text-center" >
            <Coffee className="text-lightorange h-14 w-14 mx-auto mb-6"/>
            <p className="font-bold pb-3">Присоединяйтесь к обсуждению</p>
            <span>
                <p className="text-grey text-sm">Делитесь мнениями, читайте рецензии и находите </p>
                <p className="text-grey pb-3">новые фильмы</p>
            </span>
            <Link href={'/auth'}>
            <button className="bg-gradient-to-r from-lightorange to-darkorange hover:from-darkorange hover:to-amber-800 cursor-pointer transition-transform hover:-translate-y-0.5 duration-400 rounded-2xl h-12 w-full">
                <p>Регистрация бесплатно</p>
            </button>
            </Link>
        </div>
    )
}