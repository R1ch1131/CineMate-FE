import React from "react";
import { Users, Film, BookOpen, MessageCircle} from 'lucide-react';
import { Stats } from "~/shared/ui/Stats/ui/Stats";

export const StatsBlock = () => {
  return (
    <div className="flex justify-center gap-8 cursor-default">
      <Stats icon={Film} count={47} title={"Новых фильмов"} description={"за неделю"} iconColor={"text-lightorange"} />
      <Stats icon={BookOpen} count={0} title={"Свежих рецензий"} description={"за сегодня"} iconColor={"text-green-500"} />
      <Stats icon={Users} count={1} title={"Пользователей"} description={"зарегестрировано"} iconColor={"text-blue-500"} />
      <Stats icon={MessageCircle} count={0} title={"Обсуждений"} description={"на сайте"} iconColor={"text-purple-500"} />
    </div>
  );
};
