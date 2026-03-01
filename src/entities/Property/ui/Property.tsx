import React from "react";
import type { LucideIcon } from 'lucide-react';

interface PropertyProps {
    text: string;
    textColor?: string,
    color: string;
    icon?: LucideIcon;
    iconSize?: number;
    iconColor?: string;
}

export const Property = ({text, color, icon: Icon,textColor, iconSize = 16, iconColor = 'currentColor'}: PropertyProps) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <span className={`${color} px-2 py-0.5 rounded-2xl border`}>
                <div className="flex gap-1 items-center text-white">
                    {Icon && <Icon size={iconSize} color={iconColor} />}
                    <p className={textColor}>{text}</p>
                </div>
            </span>
        </div>
    );
};