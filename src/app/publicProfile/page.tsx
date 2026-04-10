
import { ProfileCardOther } from "~/widgets/ProfileCardOther/ui/ProfileCardOther";

interface PageProps {
  searchParams: Promise<{ id: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const { id: userId } = await searchParams;

  return (
    <main>
      <div className="flex justify-center">
        <ProfileCardOther userId={userId} />
      </div>
    </main>
  );
}