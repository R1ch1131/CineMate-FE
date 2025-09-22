import React from "react";
import { User } from 'lucide-react';

interface FilmCrewProps{
    name: string,
    role: string
}

export const FilmCrew = ({name, role}: FilmCrewProps) => {
    return(
        <div className="bg-frostedglass h-20 rounded-2xl p-4">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                </div>
                <div>
                    <p className="text-white">{name}</p>
                    <p className="text-grey text-sm">{role}</p>
                </div>
            </div>
        </div>
    )
}