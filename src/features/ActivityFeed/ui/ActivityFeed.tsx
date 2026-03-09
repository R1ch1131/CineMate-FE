import { Activity } from "lucide-react";
import { ActivityItem } from "~/entities/ActivityItem";
import Actor from "~/shared/assets/icons/actor.jpg";

export const ActivityFeed = () => {
  return (
    <div>
      <div className="bg-glass rounded-2xl p-7">
        <div className="mb-5 flex items-center gap-3">
          <Activity className="h-6 w-6 text-blue-500" />
          <h3 className="font-bold text-white">Активность сообщества</h3>
        </div>
        <ActivityItem
          name={"Дмитрий Кинокритик"}
          action={"добавил в топ-10 года "}
          film="Дюна: Часть вторая"
          image={Actor}
        />
        <ActivityItem
          name={"Дмитрий Кинокритик"}
          action={"добавил в топ-10 года "}
          film="Дюна: Часть вторая"
          image={Actor}
        />
        <ActivityItem
          name={"Дмитрий Кинокритик"}
          action={"добавил в топ-10 года "}
          film="Дюна: Часть вторая"
          image={Actor}
        />
      </div>
    </div>
  );
};
