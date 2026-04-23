import React from "react";
import { Loader2 } from "lucide-react";

interface StatBoxProps {
  value: string;
  label: string;
  color?: string;
  isLoading?: boolean;
}

export const StatBox = ({ value, label, color = "text-white", isLoading = false }: StatBoxProps) => {
  return (
    <div className="flex flex-col justify-center items-center bg-glass h-25 w-full rounded-xl">
      {isLoading ? (
        <Loader2 className={`${color} animate-spin`} size={24} />
      ) : (
        <p className={`${color} text-xl 2k:text-2xl font-bold`}>{value}</p>
      )}
      <p className="text-sm 2k:text-xl text-grey">{label}</p>
    </div>
  );
};
