import React from "react";

interface GlassBoxProps {
  title: string;
  children: React.ReactNode;
}

export const GlassBox = ({ title, children }: GlassBoxProps) => {
  return (
    <div className="bg-glass p-4 rounded-xl">
      <p className="text-lg mb-2">{title}</p>
      {children}
    </div>
  );
};