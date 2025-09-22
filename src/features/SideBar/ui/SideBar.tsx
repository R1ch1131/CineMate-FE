import { TrendingUp } from "lucide-react";
import React from "react";
import { TrendTheme } from "~/features/TrendTheme";

export const SideBar = () => {
    return(
        <div className="bg-glass p-7 rounded-2xl">
              <div className="flex items-center gap-3 mb-5">
                <TrendingUp className="w-6 h-6 text-amber-500" />
                <h3 className="font-bold text-white">Трендовые темы</h3>
              </div>
            <TrendTheme />
        </div>
    )
}