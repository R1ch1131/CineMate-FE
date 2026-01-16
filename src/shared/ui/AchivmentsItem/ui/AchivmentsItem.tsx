import { type LucideIcon } from "lucide-react";
import React from "react";

interface AchivmentsItemProps {
  lable: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  background:string,
  backgroundIcon:string
}

export const AchivmentsItem = ({
  lable,
  description,
  icon: Icon,
  iconColor,
  background,
  backgroundIcon
}: AchivmentsItemProps) => {
  return (
    <div className={`flex h-20 items-center gap-4 rounded-xl border ${background} px-4`}>
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${backgroundIcon}`}>
        {Icon && <Icon className={`h-6 w-6 ${iconColor}`} />}
      </div>
      <div className="flex flex-col">
        <p className="text-white">{lable}</p>
        <p className="text-grey text-sm">{description}</p>
      </div>
    </div>
  );
};
