import React from "react";
import type { LucideIcon } from 'lucide-react';

interface PopupButtonProps {
    text?: string;
    color: string;
    icon?: LucideIcon;
    iconSize?: number;
    iconColor?: string;
}

export const PopupButton = ({text, color, icon: Icon, iconSize = 21, iconColor = 'currentColor'} : PopupButtonProps) => {
    return(
        <div className={`${color} p-3 px-4 rounded-xl flex justify-center gap-1.5 items-center`}>
            {Icon && <Icon size={iconSize} color={iconColor} />}
            {text}
        </div>
    )
}