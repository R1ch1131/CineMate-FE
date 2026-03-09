'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { BookOpen, Crown, Film, Heart, Star, UserPlus, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import { ProfileStats } from "~/entities/ProfileStats";
import noAvatar from "~/shared/assets/icons/noAvatar.jpg";
import { Grade } from "~/shared/ui/Grade/ui/Grade";
import { PublicProfileReviewsTab } from "~/features/TABS/PublicProfileReviewTab/ui/PublicProfileReviewsTab";
import { PublicProfileAboutTab } from "~/features/TABS/PublicProfileAboutTab/ui/PublicProfileAboutTab";
import { PublicProfileStatsTab } from "~/features/TABS/PublicProfileStatsTab/ui/PublicProfileStatsTab";

interface ProfileCardProps {
  description: string;
  date: string;
}

const tabStyle =
  "px-8 ml-3 py-2.5 2k:py-3.5 rounded-xl text-grey from-lightorange to-darkorange duration-200 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:text-white data-hover:bg-frostedglass data-selected:bg-gradient-to-r data-selected:text-white";

export const ProfileCardOther = ({ description, date }: ProfileCardProps) => {
  const session = useSession();

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div>
      <div className="p-7 border-grey/40 max-w-300 rounded-2xl bg-linear-to-r from-amber-500/10 to-orange-500/10 border">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-7">
            <div>
              {session?.data?.user?.image ? (
                <Image
                  width={140}
                  height={140}
                  className="h-35 w-35 rounded-full object-cover shadow-2xl shadow-amber-500/30"
                  src={session.data.user.image}
                  alt="ava"
                />
              ) : (
                <Image
                  className="h-35 w-35 rounded-full object-cover shadow-2xl shadow-amber-500/30"
                  src={noAvatar}
                  alt="ava"
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-3xl font-bold text-white">Дмитрий Кинокритик</p>
              <p className="text-grey max-w-175">{description}</p>
              <p className="text-grey pb-4">Присоединился к нам {date}</p>
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
          <Grade icon={Crown} style={"bg-purple-500/40 border border-purple-500"} text={"entusiast"} />
          <div className="flex-1 gap-3 grid grid-cols-5">
            <ProfileStats icon={BookOpen} iconColor={"text-blue-500"} count={"32"} text={"Рецензий"} />
            <ProfileStats icon={Users} iconColor={"text-green-500"} count={"1321"} text={"Подписчиков"} />
            <ProfileStats icon={Heart} iconColor={"text-red-500 fill-current"} count={"342"} text={"Лайков получено"} />
            <ProfileStats icon={Star} iconColor={"text-yellow-500 fill-current"} count={"32"} text={"Средняя оценка"} />
            <ProfileStats icon={Film} iconColor={"text-purple-500"} count={"213"} text={"Фильмов"} />
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