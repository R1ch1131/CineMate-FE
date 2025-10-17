import React from "react";

interface UserStatsProps {
  count: string;
  text: string;
}

export const UserStats = ({ count, text }: UserStatsProps) => {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl bg-white/5 pt-2 pb-2 pr-4 pl-4 text-center">
      <p className="mb-1 text-2xl font-bold text-white">{count}</p>
      <p className="text-sm text-gray-400">{text}</p>
    </div>
  );
};
