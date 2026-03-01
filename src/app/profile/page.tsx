import { ProfileCard } from "~/widgets/ProfileCard";

export default function HomePage() {
  return (
    <main>
      <div className="flex justify-center">
      <ProfileCard description={"Киноман и критик"} date={"21 января 2024 г."} />
      </div>
    </main>
  );
}