import { Bookmark } from "lucide-react";

export const MyListHeader = () => (
  <div>
    <span className="flex center text-lightorange font-bold text-2xl gap-3">
      <Bookmark className="h-9 w-9" />
      <p>Мой список</p>
    </span>
    <span className="flex flex-col center text-7xl pt-6 font-bold gap-2">
      <p>Ваша личная</p>
      <p className="gradient">кинотека</p>
    </span>
    <span className="flex flex-col center pt-10 gap-4 text-xl">
      <p className="text-grey">
        Организуйте свои фильмы, отслеживайте прогресс просмотра и получайте
      </p>
      <p className="text-grey pb-10">персональные рекомендации</p>
    </span>
  </div>
);
