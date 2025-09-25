import type { LucideIcon } from "lucide-react";
import React from "react";

interface ProfileStatsProps{
    icon?: LucideIcon
    iconColor?: string,
    count: string,
    text:string,
}

export const ProfileStats = ({icon: Icon, iconColor, count, text}: ProfileStatsProps) =>{
    return(
        <div className="bg-amber-300/10 2k:h-30 h-28 rounded-xl flex flex-col gap-1 items-center justify-center">
            {Icon && <Icon className={`h-7 w-7 ${iconColor}`} />}
            <p className="text-xl font-bold text-white">{count}</p>
            <p className="text-grey text-sm">{text}</p>
            </div>
    )
}