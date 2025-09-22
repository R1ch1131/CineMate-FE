import React from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { ViewTab } from "~/features/viewTab";
import { ActorTab } from "~/features/ActorTab";
import { ReviewTab } from "~/features/ReviewsTab/ui/Reviwew";
import { MediaTab } from "~/features/MediaTab";

interface PopupTabsProps {
  selectedIndex?: number;
  onTabChange?: (index: number) => void;
}

const tabStyle =
  "w-1/4 py-2.5 2k:py-3.5 rounded-xl text-grey from-lightorange to-darkorange duration-200 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:text-white data-hover:bg-frostedglass data-selected:bg-gradient-to-r data-selected:text-white";

export const PopupTabs = ({selectedIndex = 0, onTabChange,}: PopupTabsProps) => {
  return (
    <div>
      <TabGroup selectedIndex={selectedIndex} onChange={onTabChange}>
        <TabList className="bg-glass flex h-13 2k:h-15 w-full items-center justify-center rounded-xl">
          <Tab className={`${tabStyle}`}>Обзор</Tab>
          <Tab className={`${tabStyle}`}> Актеры</Tab>
          <Tab className={`${tabStyle}`}> Медиа</Tab>
          <Tab className={`${tabStyle}`}> Рецензии</Tab>
        </TabList>
        <TabPanels className="mt-3">
          <TabPanel>
            <ViewTab />
          </TabPanel>
          <TabPanel>
            <ActorTab />
          </TabPanel>
          <TabPanel>
            <MediaTab />
          </TabPanel>
          <TabPanel>
            <ReviewTab />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};