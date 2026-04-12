import { type LucideIcon } from "lucide-react";
import React from "react";

interface FilmMyListStatusProps{
    icon: LucideIcon,
    text: string
    color: string
}

export const FilmMyListStatus = ({icon:Icon ,text, color}: FilmMyListStatusProps) =>{
    return(
        <div className={`rounded-lg border flex center px-4 py-1 gap-2 ${color} `}>
           {Icon && <Icon className={`h-4 w-4 `} />}
           <p className="">{text}</p>
        </div>
    )
}