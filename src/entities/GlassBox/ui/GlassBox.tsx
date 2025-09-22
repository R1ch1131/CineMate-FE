import React from "react";

interface GlassBoxProps {
  title: string;
  children: React.ReactNode;
}

export const GlassBox = ({ title, children }: GlassBoxProps) => {
  return (
    <div className="bg-glass p-4 rounded-xl">
      <p className="text-lg 2k:text-xl mb-2">{title}</p>
      <div className="flex flex-col 2k:gap-2.5 gap-1.5">
      {children}
      </div>
    </div>
  );
};