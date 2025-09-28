import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { BookOpen, Crown, Edit3, Film, Heart, Users } from "lucide-react";
import Image from "next/image";
import React from "react";
import { ProfileStats } from "~/entities/ProfileStats";
import { ProfileDebateTab } from "~/features/ProfileDebateTab";
import { ProfileLikeTab } from "~/features/ProfileLikeTab";
import { ProfileReviewsTab } from "~/features/ProfileReviewsTab";
import { ProfileViewTab } from "~/features/ProfileViewTab";
import Ava from "~/shared/assets/icons/actor.jpg";

interface ProfileCardProps {
  name: string;
  description: string;
  date: string;
}

const tabStyle =
  "w-1/12 py-2.5 2k:py-3.5 rounded-xl text-grey from-lightorange to-darkorange duration-200 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:text-white data-hover:bg-frostedglass data-selected:bg-gradient-to-r data-selected:text-white";


export const ProfileCard = ({ name, description, date }: ProfileCardProps) => {
  return (
    <div className="border-grey/40 2k:h-80 h-78 2k:w-5/12 w-6/12 rounded-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border-1 ">
      <div className=" p-8">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-5">
          <div>
            <Image
              className="h-35 w-35 rounded-full object-cover shadow-2xl shadow-amber-500/30"
              src={Ava}
              alt="ava"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-3xl font-bold text-white">{name}</p>
            <p className="text-grey">{description}</p>
            <p className="text-grey">С нами с {date}</p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 rounded-2xl bg-gray-400/30 hover:bg-gray-50/30 text-white p-3 px-5">
          <Edit3 className="h-4 w-4" />
          <p>Редактировать</p>
        </div>
      </div>
      <div className="flex gap-6">
        <div className="mt-5 flex h-10 w-35 items-center justify-center gap-2 rounded-full bg-purple-500/60">
          <Crown className="h-4 w-4 text-amber-500" />
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
      <TabGroup className="pt-8">
              <TabList className="bg-glass flex h-13 2k:h-15 items-center rounded-xl">
                <Tab className={`${tabStyle}`}>Обзор1</Tab>
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
                  5
                </TabPanel>
              </TabPanels>
            </TabGroup>
    </div>
  );
};
