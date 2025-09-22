import { ArrowUp } from "lucide-react";
import React from "react";
import { TrendItem } from "~/entities/TrendItem";

export const TrendTheme = () => {
    return(
        <div>
            <TrendItem icon={ArrowUp} iconColor="text-green-500"  text={"Новинки 2024"} count={"1247"}/>
            <TrendItem icon={ArrowUp} iconColor="text-green-500"  text={"Дени Вильнев"} count={"892"}/>
            <TrendItem text={"Научная фантастика"} count={"756"}/>
            <TrendItem icon={ArrowUp} iconColor="text-green-500"  text={"Кристофер Нолан"} count={"634"}/>
            <TrendItem text={"Авторское кино"} count={"523"}/>
        </div>
    )
}