import {
  Eye,
  Filter,
  Heart,
  Star,
  TrendingUp,
  UserRoundPlus,
} from "lucide-react";
import React from "react";

export const FiltersReviews = () => {
  return (
    <div className="bg-glass border-frostedglass rounded-2xl border p-6">
      <span className="flex gap-2 text-white pb-4">
        <Filter />
        <p>Фильтры</p>
      </span>
      <div className="flex flex-col gap-4">
      <div>
        <div className="bg-lightorange rounded-xl p-2.5 py-3">
          <span className="flex gap-2 text-white">
            <Eye />
            <p>Все рецензии</p>
          </span>
        </div>
      </div>
      <div>
        <div className="rounded-xl p-2.5 py-3 hover:bg-frostedglass">
          <span className="flex gap-2 text-white">
            <UserRoundPlus />
            <p>От подписок</p>
          </span>
        </div>
      </div>
      <div>
        <div className="rounded-xl p-2.5 py-3 hover:bg-frostedglass">
          <span className="flex gap-2 text-white">
            <Heart />
            <p>Избранные</p>
          </span>
        </div>
      </div>
      <div>
        <div className="rounded-xl p-2.5 py-3 hover:bg-frostedglass">
          <span className="flex gap-2 text-white">
            <Star />
            <p>Мои рецензии</p>
          </span>
        </div>
      </div>
      <div>
        <div className=" rounded-xl p-2.5 py-3 hover:bg-frostedglass">
          <span className="flex gap-2 text-white">
            <TrendingUp />
            <p>Рекомендации</p>
          </span>
        </div>
      </div>
      </div>
    </div>
  );
};
