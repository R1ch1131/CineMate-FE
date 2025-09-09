import { TopBar } from "~/widgets/topBar";

export default function HomePage() {
  return (
    <main>
      <TopBar activeLink="/profile" />
      <div className="flex justify-center items-center">
        профиль
      </div>
    </main>
  );
}