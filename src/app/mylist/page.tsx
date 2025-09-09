import { TopBar } from "~/widgets/topBar";

export default function HomePage() {
  return (
    <main>
      <TopBar activeLink="/mylist"/>
      <div className="text-white flex justify-center items-center text-9xl">
        Мой список
      </div>
    </main>
  );
}