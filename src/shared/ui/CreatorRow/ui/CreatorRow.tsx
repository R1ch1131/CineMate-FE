import React from "react";

interface CreatorRowProps {
    role: string;
    name: string;
}

export const CreatorRow = ({ role, name }: CreatorRowProps) => {
    return(
        <div className="flex justify-between">
            <p className="text-grey text-base">{role}</p>
            <p className="text-base">{name}</p>
        </div>
    );
};