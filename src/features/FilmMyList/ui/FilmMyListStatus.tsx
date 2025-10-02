import { Icon, type LucideIcon } from "lucide-react";
import React from "react";

interface FilmMyListStatusProps{
    icon: LucideIcon,
    text: string
}

export const FilmMyListStatus = ({icon:Icon ,text}: FilmMyListStatusProps) =>{
    return(
        <div className="bg-blue-500/40 rounded-lg border border-blue-500 flex center px-2 py-1 gap-1 text-blue-300">
           {Icon && <Icon className={`h-3 w-3 `} />}
           <p className="text-xs">{text}</p>
        </div>
    )
}