import type { LucideIcon } from "lucide-react";
import React from "react";

interface StatsProps {
    icon : LucideIcon,
    count : number,
    title: string,
    description: string,
    iconColor: string
}

export const Stats = ({icon: Icon, count, title, description, iconColor}: StatsProps) => {
    return(
        <div className="bg-glass hover:bg-frostedglass border-glass flex h-43 w-74 flex-col items-center justify-center gap-1 rounded-2xl border text-white shadow-2xl">
            {Icon && <Icon className={`h-8 w-9 ${iconColor}`} />}
            <p className="text-xl font-bold">{count}</p>
            <p className="text-sm">{title}</p>
            <p className="text-xs">{description}</p>
      </div>
    )
}