import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ViewTab } from "~/widgets/viewTab";
import { ActorTab } from "~/widgets/ActorTab";
import { ReviewTab } from "~/widgets/ReviewsTab/ui/Reviwew";
import { MediaTab } from "~/widgets/MediaTab";

export const PopupTabs = () => {
  return (
    <div>
      <TabGroup>
        <TabList className="bg-glass flex h-13 w-full items-center justify-center rounded-xl">
          <Tab className="w-1/4 py-3 rounded-xl text-grey from-lightorange to-darkorange duration-200 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:text-white data-hover:bg-frostedglass data-selected:bg-gradient-to-r data-selected:text-white">
            Обзор
          </Tab>
          <Tab className="w-1/4 py-3 rounded-xl text-grey from-lightorange to-darkorange duration-200 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:text-white data-hover:bg-frostedglass data-selected:bg-gradient-to-r data-selected:text-white">
            Актеры
          </Tab>
          <Tab className="w-1/4 py-3 rounded-xl text-grey from-lightorange to-darkorange duration-200 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:text-white data-hover:bg-frostedglass data-selected:bg-gradient-to-r data-selected:text-white">
            Медиа
          </Tab>
          <Tab className="w-1/4 py-3 rounded-xl text-grey from-lightorange to-darkorange duration-200 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:text-white data-hover:bg-frostedglass data-selected:bg-gradient-to-r data-selected:text-white">
            Рецензии
          </Tab>
        </TabList>
        <TabPanels className="mt-3">
          <TabPanel>
            <ViewTab />
          </TabPanel>
          <TabPanel>
            <ActorTab/>
          </TabPanel>
          <TabPanel>
            <MediaTab />
          </TabPanel>
          <TabPanel>
           <ReviewTab/>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};