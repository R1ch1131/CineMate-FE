import React from "react";
import type { LucideIcon } from "lucide-react";

interface AwardItemProps {
  text?: string;
  color?: string;
  icon?: LucideIcon;
  iconSize?: number;
  classname?: string;
}

export const AwardItem = ({text, color, icon: Icon, iconSize = 21, classname}: AwardItemProps) => {
  return (
    <div
      className={`${color} flex items-center gap-2 rounded-xl`}
    >
      {Icon && <Icon size={iconSize} className={classname} />}
      <div className="text-lg 2k:text-xl ">

      {text}
      </div>
    </div>
  );
};
