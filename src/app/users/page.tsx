import { UserCard } from "~/widgets/UserCard";

export default function HomePage() {
  return (
    <main>
      <div className="flex justify-center">
        <UserCard
          description={
            "Кинокритик с 15-летним стажем. Специализируюсь на европейском кино и документальных фильмах. Член Гильдии кинокритиков."
          }
        />
      </div>
    </main>
  );
}
