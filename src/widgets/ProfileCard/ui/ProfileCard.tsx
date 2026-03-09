'use client'

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { BookOpen, Crown, Edit3, Film, Heart, Users } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState } from "react";
import { ProfileStats } from "~/entities/ProfileStats";
import { ProfileDebateTab } from "~/features/TABS/ProfileDebateTab";
import { ProfileLikeTab } from "~/features/TABS/ProfileLikeTab";
import { ProfileReviewsTab } from "~/features/TABS/ProfileReviewsTab";
import { ProfileSettingTab } from "~/features/TABS/ProfileSettingTab";
import { ProfileViewTab } from "~/features/TABS/ProfileViewTab";
import noAvatar from "~/shared/assets/icons/noAvatar.jpg";

interface ProfileCardProps {
  description: string;
  date: string;
}

const tabStyle =
  "px-8 ml-3 py-2.5 2k:py-3.5 rounded-xl text-grey from-lightorange to-darkorange duration-200 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:text-white data-hover:bg-frostedglass data-selected:bg-gradient-to-r data-selected:text-white";

export const ProfileCard = ({ description, date }: ProfileCardProps) => {
  const session = useSession();
  const emailWithoutDomain = session.data?.user?.email?.split("@")[0];

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="border-grey/40 2k:h-80 h-78 2k:w-5/12 w-7/12 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-1">
      <div className="p-7">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-7">
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
              <p className="text-3xl font-bold text-white">{emailWithoutDomain}</p>
              <p className="text-grey">{description}</p>
              <p className="text-grey">Присоединился к нам {date}</p>
            </div>
          </div>
          <div
            onClick={() => setSelectedTab(4)} 
            className="flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gray-400/30 hover:bg-gray-50/30 text-white p-3 px-5"
          >
            <Edit3 className="h-4 w-4" />
            <p>Редактировать</p>
          </div>
        </div>
        <div className="flex gap-6">
          <div className="mt-5 flex h-10 w-35 items-center justify-center gap-2 text-amber-500 rounded-full bg-purple-500/40 border border-purple-500">
            <Crown className="h-4 w-4 " />
            <p>enthusiast</p>
          </div>
          <div className="flex-1 gap-3 grid grid-cols-4">
            <ProfileStats icon={BookOpen} iconColor={"text-blue-500"} count={"32"} text={"Рецензий"} />
            <ProfileStats icon={Film} iconColor={"text-purple-500"} count={"213"} text={"Фильмов просмотрено"} />
            <ProfileStats icon={Heart} iconColor={"text-red-500"} count={"342"} text={"Лайков получено"} />
            <ProfileStats icon={Users} iconColor={"text-green-500"} count={"1321"} text={"Подписчиков"} />
          </div>
        </div>
      </div>
      <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab} className="pt-8">
        <TabList className="bg-glass flex h-15 2k:h-17 items-center rounded-xl">
          <Tab className={`${tabStyle}`}>Обзор</Tab>
          <Tab className={`${tabStyle}`}>Рецензии</Tab>
          <Tab className={`${tabStyle}`}>Избранное</Tab>
          <Tab className={`${tabStyle}`}>Споры</Tab>
          <Tab className={`${tabStyle}`}>Настройки</Tab>
        </TabList>
        <TabPanels className="mt-3">
          <TabPanel>
            <ProfileViewTab />
          </TabPanel>
          <TabPanel>
            <ProfileReviewsTab />
          </TabPanel>
          <TabPanel>
            <ProfileLikeTab />
          </TabPanel>
          <TabPanel>
            <ProfileDebateTab />
          </TabPanel>
          <TabPanel>
            <ProfileSettingTab />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};