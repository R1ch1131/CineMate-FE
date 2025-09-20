import React from "react";
import type { LucideIcon } from "lucide-react";

interface PopupButtonProps {
  text?: string;
  color: string;
  icon?: LucideIcon;
  iconSize?: number;
  iconColor?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const PopupButton = ({text, color, icon: Icon, iconSize = 21, iconColor = "currentColor", onClick}: PopupButtonProps) => {
  return (
    <button
      className={`${color} flex items-center justify-center gap-1.5 rounded-xl p-3 px-4`}
      onClick={onClick}
    >
      {Icon && <Icon size={iconSize} color={iconColor} />}
      {text}
    </button>
  );
};
