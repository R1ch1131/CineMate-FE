import React from "react";
import { CONSTANTS } from "~/shared/lib/strings";
import { Users, Film, BookOpen} from 'lucide-react';

export const StatsBlock = () => {
  return (
    <div className="flex justify-center gap-7">
      <div className="bg-glass hover:bg-frostedglass border-glass flex h-38 w-58 flex-col items-center justify-center gap-1 rounded-2xl border text-white shadow-2xl">
       <Film className='text-lightorange h-8 w-9'/>
        <p className="text-xl font-bold">43465</p>
        <p className="text-sm">{CONSTANTS.mainPage.statsBlock.film}</p>
        <p className="text-xs">{CONSTANTS.mainPage.statsBlock.estimate}</p>
      </div>
      <div className="bg-glass hover:bg-frostedglass border-glass flex h-38 w-58 flex-col items-center justify-center gap-1 rounded-2xl border text-white shadow-2xl">
        <BookOpen className='text-green-500 h-8 w-9'/>
        <p className="text-xl font-bold">0</p>
        <p className="text-sm">{CONSTANTS.mainPage.statsBlock.rewiew}</p>
        <p className="text-xs">{CONSTANTS.mainPage.statsBlock.fromUsere}</p>
      </div>
      <div className="bg-glass hover:bg-frostedglass border-glass flex h-38 w-58 flex-col items-center justify-center gap-1 rounded-2xl border text-white shadow-2xl">
        <Users className='text-purple-500 h-8 w-9'/>
        <p className="text-xl font-bold">1</p>
        <p className="text-sm">{CONSTANTS.mainPage.statsBlock.user}</p>
        <p className="text-xs">{CONSTANTS.mainPage.statsBlock.register}</p>
      </div>
    </div>
  );
};
