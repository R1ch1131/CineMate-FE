import Link from "next/link";
import { AuthButton } from "~/shared/authButton/ui/authButton";
import { TopBar } from "~/widgets/topBar/ui/TopBar";

export default function HomePage() {
  return (
    <main>
      <TopBar activeLink="/profile" />
      <div className="flex justify-center items-center">
        <AuthButton />
      </div>
    </main>
  );
}