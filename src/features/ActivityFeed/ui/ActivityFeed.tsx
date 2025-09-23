import { Activity } from "lucide-react";
import React from "react";
import { ActivityItem } from "~/entities/ActivityItem";
import Actor from "~/shared/assets/icons/actor.jpg"

export const ActivityFeed = () => {
    return(
        <div>
             <div className="bg-glass p-7 rounded-2xl">
              <div className="flex items-center gap-3 mb-5">
                <Activity className="w-6 h-6 text-blue-500" />
                <h3 className="font-bold text-white">Активность сообщества</h3>
              </div>
            <ActivityItem name={"Дмитрий Кинокритик"} action={"добавил в топ-10 года "} film="Дюна: Часть вторая" image={Actor}  />
            <ActivityItem name={"Дмитрий Кинокритик"} action={"добавил в топ-10 года "} film="Дюна: Часть вторая" image={Actor}  />
            <ActivityItem name={"Дмитрий Кинокритик"} action={"добавил в топ-10 года "} film="Дюна: Часть вторая" image={Actor}  />
        </div>
        </div>
           
    )
}