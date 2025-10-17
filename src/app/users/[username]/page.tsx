import { UserCard } from "~/widgets/UserCard";

interface PageProps {
  params: { username: string };
}

export default function UserProfilePage({ params }: PageProps) {
  // Лучше потом переделать и использовать id вместо username, чтобы не было повторов имен пользователей
  const username = decodeURIComponent(params.username);
  return (
    <main>
      <div className="flex justify-center">
        <UserCard
          description={
            "Кинокритик с 15-летним стажем. Специализируюсь на европейском кино и документальных фильмах. Член Гильдии кинокритиков."
          }
          displayName={username}
        />
      </div>
    </main>
  );
}
