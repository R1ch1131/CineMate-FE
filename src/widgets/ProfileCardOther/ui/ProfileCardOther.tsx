'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { BookOpen, Crown, Film, Heart, Star, UserPlus, Users, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ProfileStats } from "~/entities/ProfileStats";
import noAvatar from "~/shared/assets/icons/noAvatar.jpg";
import { Grade } from "~/shared/ui/Grade/ui/Grade";
import { PublicProfileReviewsTab } from "~/features/TABS/PublicProfileReviewTab/ui/PublicProfileReviewsTab";
import { PublicProfileAboutTab } from "~/features/TABS/PublicProfileAboutTab/ui/PublicProfileAboutTab";
import { PublicProfileStatsTab } from "~/features/TABS/PublicProfileStatsTab/ui/PublicProfileStatsTab";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  role: string;
  createdAt: string;
}

interface UserStats {
  totalReviews: number;
  totalLikesReceived: number;
  averageRating: number;
}

interface ProfileCardProps {
  userId: string;
}

const tabStyle =
  "px-8 ml-3 py-2.5 2k:py-3.5 rounded-xl text-grey from-lightorange to-darkorange duration-200 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:text-white data-hover:bg-frostedglass data-selected:bg-gradient-to-r data-selected:text-white";

export const ProfileCardOther = ({ userId }: ProfileCardProps) => {
  const { data: session } = useSession();
  const [selectedTab, setSelectedTab] = useState(0);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<UserStats>({ totalReviews: 0, totalLikesReceived: 0, averageRating: 0 });
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setError('userId не передан');
        setIsLoading(false);
        return;
      }
      try {
        setIsLoading(true);
        const url = `${process.env.NEXT_PUBLIC_API_URL}/profile/${userId}`;

        const headers: HeadersInit = { Accept: 'application/json' };
        const token = session?.user?.accessToken;
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(url, { headers });

        if (!response.ok) {
          throw new Error(`Ошибка загрузки профиля: ${response.status}`);
        }

        const data = await response.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Не удалось загрузить профиль');
      } finally {
        setIsLoading(false);
      }
    };

    void fetchProfile();
  }, [userId, session]);

  // Загружаем статистику рецензий
  useEffect(() => {
    const fetchStats = async () => {
      if (!userId) return;
      try {
        setStatsLoading(true);
        const url = `${process.env.NEXT_PUBLIC_API_URL}/reviews/user/${userId}?page=0&size=1000`;

        const headers: HeadersInit = { Accept: 'application/json' };
        const token = session?.user?.accessToken;
        if (token) {
          headers.Authorization = `Bearer ${token}`;
        }

        const response = await fetch(url, { headers });
        if (!response.ok) throw new Error('Ошибка загрузки рецензий');

        const data = await response.json();
        const reviews = data?.content ?? [];

        const totalReviews = reviews.length;
        const totalLikesReceived = reviews.reduce((sum: number, r: { likesCount: number }) => sum + (r.likesCount ?? 0), 0);
        const avgRating = totalReviews > 0
          ? reviews.reduce((sum: number, r: { rating: number }) => sum + (r.rating ?? 0), 0) / totalReviews
          : 0;

        setStats({ totalReviews, totalLikesReceived, averageRating: Math.round(avgRating * 10) / 10 });
      } catch (err) {
        console.error('Ошибка загрузки статистики:', err);
      } finally {
        setStatsLoading(false);
      }
    };

    void fetchStats();
  }, [userId, session?.user?.accessToken]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-lightorange"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="text-center py-20 text-red-400 font-medium">
        {error ?? "Профиль не найден"}
      </div>
    );
  }

  const formattedDate = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Недавно";

  return (
    <div>
      <div className="p-7 border-grey/40 rounded-2xl bg-linear-to-r from-amber-500/10 to-orange-500/10 border">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-7">
            <div>
              <Image
                width={140}
                height={140}
                className="h-35 w-35 rounded-full object-cover shadow-2xl shadow-amber-500/30"
                src={profile?.avatarUrl ?? noAvatar}
                alt="ava"
                unoptimized={typeof profile?.avatarUrl === 'string'}
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-bold text-white">{profile.username}</p>
              {profile.bio && <p className="text-grey max-w-175">{profile.bio}</p>}
              <p className="text-grey pb-4">Присоединился к нам {formattedDate}</p>
            </div>
          </div>
          <button
            onClick={() => setSelectedTab(4)}
            className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-linear-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white p-3 px-5"
          >
            <UserPlus className="h-5 w-5" />
            <p>Подписаться</p>
          </button>

        </div>
        <div className="flex gap-6">
          <Grade icon={Crown} style={"bg-purple-500/40 border border-purple-500"} text={profile.role} />
          <div className="flex-1 gap-3 grid grid-cols-5">
            <ProfileStats
              icon={BookOpen}
              iconColor={"text-blue-500"}
              count={statsLoading ? <span className="inline-block animate-pulse">•••</span> : String(stats.totalReviews)}
              text={"Рецензий"}
            />
            <ProfileStats icon={Users} iconColor={"text-green-500"} count={"23"} text={"Подписчиков"} />
            <ProfileStats
              icon={Heart}
              iconColor={"text-red-500 fill-current"}
              count={statsLoading ? <span className="inline-block animate-pulse">•••</span> : String(stats.totalLikesReceived)}
              text={"Лайков получено"}
            />
            <ProfileStats
              icon={Star}
              iconColor={"text-yellow-500 fill-current"}
              count={statsLoading ? <span className="inline-block animate-pulse">•••</span> : String(stats.averageRating)}
              text={"Средняя оценка"}
            />
            <ProfileStats icon={Film} iconColor={"text-purple-500"} count={"23"} text={"Фильмов"} />
          </div>
        </div>
      </div>
      <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab} className="pt-8">
        <TabList className="bg-glass flex h-15 2k:h-17 items-center rounded-xl">
          <Tab className={`${tabStyle}`}>Рецензии</Tab>
          <Tab className={`${tabStyle}`}>Статистика</Tab>
          <Tab className={`${tabStyle}`}>О пользователе</Tab>
        </TabList>
        <TabPanels className="mt-3">
          <TabPanel>
            <PublicProfileReviewsTab />
          </TabPanel>
          <TabPanel>
            <PublicProfileStatsTab />
          </TabPanel>
          <TabPanel>
            <PublicProfileAboutTab />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};