import { TopBar } from "~/widgets/topBar";

export default function HomePage() {
  return (
    <main>
      <TopBar />
      <div className="text-white flex justify-center items-center text-9xl">
        Главная
      </div>
    </main>
  );
}