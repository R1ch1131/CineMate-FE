import React from "react";
import type { LucideIcon } from 'lucide-react';

interface PropertyProps {
    text: string;
    color: string;
    icon?: LucideIcon;
    iconSize?: number;
    iconColor?: string;
}

export const Property = ({text, color, icon: Icon, iconSize = 16, iconColor = 'currentColor'}: PropertyProps) => {
    return (
        <div className="flex items-center justify-center gap-2">
            <span className={`${color} px-3 py-1 rounded-2xl`}>
                <div className="flex gap-1 items-center text-white">
                    {Icon && <Icon size={iconSize} color={iconColor} />}
                    {text}
                </div>
            </span>
        </div>
    );
};