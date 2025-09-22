import React from "react";

interface StatBoxProps {
  value: string;
  label: string;
  color?: string;
}

export const StatBox = ({ value, label, color = "text-white" }: StatBoxProps) => {
  return (
    <div className="flex flex-col justify-center items-center bg-glass h-25 w-full rounded-xl">
      <p className={`${color} text-xl 2k:text-2xl font-bold`}>{value}</p>
      <p className="text-sm 2k:text-xl text-grey">{label}</p>
    </div>
  );
};