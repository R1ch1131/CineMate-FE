import type { LucideIcon } from "lucide-react";
import React from "react";

interface TrendItemProps {
    icon?: LucideIcon,
    iconColor? : string,
    text: string,
    count: string
}

export const TrendItem = ({icon: Icon, iconColor, text, count} : TrendItemProps) => {
    return(
        <div className="text-white flex justify-between items-center w-80 h-10 px-3 hover:bg-frostedglass rounded-xl">
            <div className="flex gap-2 ">
            {Icon && <Icon width={17} className={iconColor} />}
            {text}
            </div>
            <div>
                {count}
            </div>
            
        </div>
    )
}