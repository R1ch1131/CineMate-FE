import { Activity, Award, BookOpen, Crown, Film, Heart, Star } from "lucide-react";
import { AchivmentsItem } from "~/shared/ui/AchivmentsItem";

export const ProfileViewTab = () => {
  return (
    <div className="pt-4">
      <div className="flex gap-7">
        <div className="w-2/3">
          <div className="flex flex-col gap-7">
            <div className="bg-glass border-grey/40 h-75 rounded-2xl border shadow-xl">
              <div className="flex items-center gap-3 p-6">
                <Award className="h-6 w-6 text-amber-500" />
                <p className="text-2xl font-bold text-white">Достижения</p>
              </div>
              <div className="grid grid-cols-2 gap-4 px-4">
                <AchivmentsItem
                  lable={"Первая рецензия"}
                  description={"Написал первую  рецензию"}
                  icon={BookOpen}
                  iconColor={"text-blue-500"}
                  background={"bg-blue-500/20 border-blue-500/50"}
                  backgroundIcon={"bg-blue-500/20"}
                />
                <AchivmentsItem
                  lable={"Популярный критик"}
                  description={"Получили 100+ лайков"}
                  icon={Heart}
                  iconColor={"text-red-500"}
                  background={"bg-red-500/20 border-red-500/50"}
                  backgroundIcon={"bg-red-500/20"}
                />
                <AchivmentsItem
                  lable={"Киноман"}
                  description={"Просмотрели 50+ фильмов"}
                  icon={Film}
                  iconColor={"text-purple-500"}
                  background={"bg-purple-500/20 border-purple-500/50"}
                  backgroundIcon={"bg-purple-500/20"}
                />
                <AchivmentsItem
                  lable={"Эксперт года"}
                  description={"Получили статус эксперта"}
                  icon={Crown}
                  iconColor={"text-amber-500"}
                  background={"bg-amber-500/20 border-amber-500/50"}
                  backgroundIcon={"bg-amber-500/20"}
                />
              </div>
            </div>
            <div className="bg-glass border-grey/40 rounded-2xl border p-6 shadow-xl">
              <div className="flex gap-4">
                <Activity className="h-6 w-6 text-green-500" />
                <p className="text-2xl font-bold text-white">
                  Последняя активность
                </p>
              </div>
              <div className="flex items-center pt-4">
                <p className="text-grey">Давно не было активности</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/3">
          <div className="flex flex-col gap-7">
            <div className="bg-glass border-grey/40 h-50 rounded-2xl border p-5 shadow-xl">
              <p className="pb-4 text-xl font-bold text-white">
                Быстрая статистика
              </p>
              <div className="flex flex-col gap-4.5">
                <div className="flex justify-between">
                  <p className="text-grey">Средний рейтинг</p>
                  <span className="flex">
                    <Star className="h-5 w-5 fill-current text-amber-500" />
                    <p className="text-white">4.2</p>
                  </span>
                </div>
                <div className="flex justify-between">
                  <p className="text-grey">Любимый жанр</p>
                  <p className="text-white">Sci-Fi</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-grey">Всего просмотров</p>
                  <p className="text-white">12.5K</p>
                </div>
              </div>
            </div>
            <div className="bg-glass border-grey/40 rounded-2xl border p-5 shadow-xl">
              <p className="text-xl font-bold text-white">Социальные сети</p>
              <div className="flex items-center pt-3">
                <p className="text-grey">Социальные сети не добавлены</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
