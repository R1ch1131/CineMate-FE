'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { BookOpen, Crown, Edit3, Film, Heart, Users, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { ProfileStats } from "~/entities/ProfileStats";
import { ProfileDebateTab } from "~/features/TABS/ProfileDebateTab";
import { ProfileLikeTab } from "~/features/TABS/ProfileLikeTab";
import { ProfileReviewsTab } from "~/features/TABS/ProfileReviewsTab";
import { ProfileSettingTab } from "~/features/TABS/ProfileSettingTab";
import { ProfileViewTab } from "~/features/TABS/ProfileViewTab";
import noAvatar from "~/shared/assets/icons/noAvatar.jpg";

interface UserProfile {
  username?: string;
  bio?: string;
  createdAt?: string;
  image?: string;
}

const tabStyle =
  "px-8 ml-3 py-2.5 2k:py-3.5 rounded-xl text-grey from-lightorange to-darkorange duration-200 focus:outline-none data-hover:text-white data-hover:bg-frostedglass data-selected:bg-gradient-to-r data-selected:text-white cursor-pointer";

export const ProfileCard = () => {
  const { data: session } = useSession();
  const token = (session?.user as { accessToken?: string })?.accessToken;

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);

  const fetchProfile = useCallback(async () => {
    if (!token) return;
    try {
      const response = await fetch('/api/profile/me', {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache'
        }
      });
      if (response.ok) {
        const data = (await response.json()) as UserProfile;
        if (data?.username) setProfile(data);
      }
    } catch (err) {
      console.error("Fetch profile failed:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => { 
    void fetchProfile(); 
  }, [fetchProfile]);

  const formatDate = (dateString?: string) => {
    if (!dateString) return "неизвестно";
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
  };

  if (loading && !profile) {
    return (
      <div className="flex justify-center p-20">
        <Loader2 className="animate-spin text-amber-500 w-10 h-10" />
      </div>
    );
  }

  const user = session?.user;

  const sessionUser = user 
    ? (user as typeof user & { bio?: string; createdAt?: string }) 
    : null;

  const displayUsername = profile?.username ?? sessionUser?.name ?? "Пользователь";
  const displayBio = profile?.bio ?? sessionUser?.bio ?? "Киноман и критик";
  const displayDate = profile?.createdAt ?? sessionUser?.createdAt;
  const displayImage = profile?.image ?? sessionUser?.image ?? noAvatar;

  return (
    <div className="border-grey/40 2k:h-80 h-78 2k:w-5/12 w-7/12 rounded-2xl bg-linear-to-r from-amber-500/10 to-orange-500/10 border">
      <div className="p-7">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-7">
            <Image
              width={140} height={140}
              className="h-35 w-35 rounded-full object-cover shadow-2xl shadow-amber-500/30"
              src={displayImage}
              alt="avatar"
            />
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-bold text-white">{displayUsername}</p>
              <p className="text-grey">{displayBio}</p>
              <p className="text-grey text-sm">Присоединился к нам {formatDate(displayDate)}</p>
            </div>
          </div>
          <div
            onClick={() => setSelectedTab(4)} 
            className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gray-400/30 hover:bg-gray-50/30 text-white p-3 px-5 transition-all"
          >
            <Edit3 className="h-4 w-4" />
            <p>Редактировать</p>
          </div>
        </div>
        
        <div className="flex gap-6 mt-5">
          <div className="flex h-10 w-35 items-center justify-center gap-2 text-amber-500 rounded-full bg-purple-500/40 border border-purple-500">
            <Crown className="h-4 w-4" />
            <p>enthusiast</p>
          </div>
          <div className="flex-1 gap-3 grid grid-cols-4">
            <ProfileStats icon={BookOpen} iconColor={"text-blue-500"} count={"32"} text={"Рецензий"} />
            <ProfileStats icon={Film} iconColor={"text-purple-500"} count={"213"} text={"Фильмов"} />
            <ProfileStats icon={Heart} iconColor={"text-red-500"} count={"342"} text={"Лайков"} />
            <ProfileStats icon={Users} iconColor={"text-green-500"} count={"1321"} text={"Подписчиков"} />
          </div>
        </div>
      </div>

      <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab} className="pt-8">
        <TabList className="bg-glass flex h-15 2k:h-17 items-center rounded-xl">
          <Tab className={tabStyle}>Обзор</Tab>
          <Tab className={tabStyle}>Рецензии</Tab>
          {/* <Tab className={tabStyle}>Избранное</Tab> */}
          <Tab className={tabStyle}>Споры</Tab>
          <Tab className={tabStyle}>Настройки</Tab>
        </TabList>
        <TabPanels className="mt-3">
          <TabPanel><ProfileViewTab /></TabPanel>
          <TabPanel><ProfileReviewsTab /></TabPanel>
          {/* <TabPanel><ProfileLikeTab /></TabPanel> */}
          <TabPanel><ProfileDebateTab /></TabPanel>
          <TabPanel><ProfileSettingTab onUpdate={() => { void fetchProfile(); }} /></TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};