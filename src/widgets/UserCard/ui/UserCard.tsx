"use client";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import {
  MapPin,
  Calendar,
  Crown,
  MessageCircle,
  Eye,
  UserPlus,
  Share2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import { UserStats } from "~/entities/UserStats";
import { ProfileDebateTab } from "~/features/ProfileDebateTab";
import { ProfileLikeTab } from "~/features/ProfileLikeTab";
import { ProfileReviewsTab } from "~/features/ProfileReviewsTab";
import { ProfileSettingTab } from "~/features/ProfileSettingTab";
import { ProfileViewTab } from "~/features/ProfileViewTab";
import noAvatar from "~/shared/assets/icons/noAvatar.jpg";

interface UserCardProps {
  description: string;
  displayName?: string;
}

const tabStyle =
  "px-8 ml-3 py-2.5 2k:py-3.5 rounded-xl text-grey from-lightorange to-darkorange duration-200 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:text-white data-hover:bg-frostedglass data-selected:bg-gradient-to-r data-selected:text-white";

export const UserCard = ({ description, displayName }: UserCardProps) => {
  const session = useSession();

  const resolvedDisplayName =
    displayName ||
    session.data?.user?.name ||
    session.data?.user?.email?.split("@")[0] ||
    "Гость";

  return (
    <div className="2k:h-80 2k:w-5/12 flex w-280 flex-col gap-6">
      <div className="border-grey/40 flex max-w-full items-start justify-between gap-6 overflow-hidden rounded-2xl border-1 bg-gradient-to-r from-amber-500/10 to-orange-500/10 p-8">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-5">
            <div className="flex flex-col items-center">
              <div className="h-40 w-40 overflow-hidden rounded-full border-4 border-amber-500/50 shadow-2xl shadow-amber-500/25">
                {session?.data?.user?.image ? (
                  <img
                    className="h-full w-full object-cover"
                    src={session.data.user.image}
                    alt="ava"
                  />
                ) : (
                  <Image
                    className="h-full w-full object-cover"
                    src={noAvatar}
                    alt="ava"
                  />
                )}
              </div>
              <div className="mt-5 flex h-10 w-35 items-center justify-center gap-2 rounded-full border border-purple-500 bg-purple-500/40">
                <Crown className="h-4 w-4" />
                <span className="font-bold text-amber-400 capitalize">
                  Эксперт
                </span>
              </div>
              <div className="mt-4 flex items-center space-x-2 text-sm text-green-500">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <span>Онлайн</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-full min-w-0 flex-1 flex-col justify-between gap-3">
          <div className="flex w-full min-w-0 flex-wrap justify-between gap-6">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <p className="text-3xl font-bold text-white">
                {resolvedDisplayName}
              </p>
              <p className="mb-4 max-w-2xl text-lg leading-relaxed break-words text-gray-300">
                {description}
              </p>
              <div className="mb-6 flex items-center space-x-6 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span className="w-min text-sm">
                    Присоединился март 2019 г.
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">Москва, Россия</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span className="text-sm">12 560 просмотров</span>
                </div>
              </div>
            </div>
            <div className="flex h-min flex-wrap items-start justify-between gap-2">
              <div className="flex items-center space-x-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-600 hover:to-purple-600">
                <UserPlus className="h-4 w-4 md:h-5 md:w-5" />
                <span>Подписаться</span>
              </div>
              <div className="flex items-center space-x-2 rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-white/20">
                <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
                <span>Сообщение</span>
              </div>
              <div className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white transition-all hover:bg-white/20">
                <Share2 className="h-4 w-4 md:h-5 md:w-5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            <UserStats count={"42"} text={"Рецензий"} />
            <UserStats count={"1 240"} text={"Подписчиков"} />
            <UserStats count={"8 945"} text={"Лайков"} />
            <UserStats count={"8.3"} text={"Средняя оценка"} />
            <UserStats count={"2 867"} text={"Фильмов"} />
          </div>
        </div>
      </div>
      <TabGroup className="pt-8">
        <TabList className="bg-glass 2k:h-17 flex h-15 items-center rounded-xl">
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
