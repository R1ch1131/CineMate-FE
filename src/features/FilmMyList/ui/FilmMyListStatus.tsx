import { type LucideIcon } from "lucide-react";
import React from "react";

interface FilmMyListStatusProps{
    icon: LucideIcon,
    text: string
    color: string
}

export const FilmMyListStatus = ({icon:Icon ,text, color}: FilmMyListStatusProps) =>{
    return(
        <div className={`rounded-lg border flex center px-2 py-1 gap-1 ${color} `}>
           {Icon && <Icon className={`h-3 w-3 `} />}
           <p className="text-xs">{text}</p>
        </div>
    )
}