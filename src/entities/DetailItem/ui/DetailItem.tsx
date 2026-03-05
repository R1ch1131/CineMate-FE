import React from "react";

interface DetailItemProps {
  label: string;
  value: string | number;
  className?: string;
}

export const DetailItem = ({ label, value, className = "" }: DetailItemProps) => {
  return (
    <div className={`flex text-lg 2k:text-xl justify-between ${className}`}>
      <span className="text-grey text-md">{label}</span>
      <span className="2k:text-lg text-sm">{value}</span>
    </div>
  );
};
