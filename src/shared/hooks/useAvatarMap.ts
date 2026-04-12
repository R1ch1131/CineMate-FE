import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

export function useAvatarMap(userIds: string[]) {
  const { data: session } = useSession();
  const [avatarMap, setAvatarMap] = useState<Record<string, string>>({});

  useEffect(() => {
    const unique = [...new Set(userIds.filter(Boolean))];
    if (unique.length === 0) return;

    const toLoad = unique.filter(id => !avatarMap[id]);
    if (toLoad.length === 0) return;

    const controller = new AbortController();

    void Promise.allSettled(
      toLoad.map(async (userId) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/${userId}`, {
          headers: {
            Accept: "application/json",
            ...(session?.user?.accessToken && {
              Authorization: `Bearer ${session.user.accessToken}`,
            }),
          },
          signal: controller.signal,
        });
        if (!res.ok) throw new Error("Failed");
        const data = (await res.json()) as { avatarUrl?: string };
        return { userId, avatarUrl: data.avatarUrl };
      })
    ).then((results) => {
      const newMap: Record<string, string> = {};
      results.forEach((r) => {
        if (r.status === "fulfilled" && r.value.avatarUrl) {
          newMap[r.value.userId] = r.value.avatarUrl;
        }
      });
      if (Object.keys(newMap).length > 0) {
        setAvatarMap((prev) => ({ ...prev, ...newMap }));
      }
    });

    return () => controller.abort();
  }, [userIds, session?.user?.accessToken, avatarMap]);

  return avatarMap;
}
