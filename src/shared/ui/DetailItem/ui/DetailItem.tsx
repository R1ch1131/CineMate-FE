import React from "react";

interface DetailItemProps {
  label: string;
  value: string | number;
  className?: string;
}

export const DetailItem = ({ label, value, className = "" }: DetailItemProps) => {
  return (
    <div className={`flex text-lg 2k:text-xl justify-between ${className}`}>
      <span className="text-grey">{label}</span>
      <span>{value}</span>
    </div>
  );
};
