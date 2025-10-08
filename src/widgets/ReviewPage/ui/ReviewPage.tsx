import React from "react";
import { HotDebate } from "./HotDebate";
import { SearchBar } from "./SearchBar";
import { NewReviewButton } from "./NewReviewButton";
import { useState } from "react";
import { ReviewCols } from "./ReviewCols";
import { REVIEW_TABS, TAB_DATA} from './../lib/constants';
import { Filter } from "lucide-react";

export const ReviewPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const currentReviewsCount = TAB_DATA[activeTab]?.length || 0;
  
  const currentTabName = REVIEW_TABS[activeTab]?.name || "Все рецензии";

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4 pb-8">
        <p className="text-4xl font-bold text-white">Рецензии</p>
        <span className="flex flex-col items-center gap-1">
          <p className="text-grey">
            Читайте мнения других киноманов, делитесь своими впечатлениями и
          </p>
          <p className="text-grey">учавствуйте в обсуждениях</p>
        </span>
      </div>
      <div className="flex justify-center">
        <div className="flex w-4/6 gap-10">
          <div className="flex w-4/12 flex-col gap-5">
            <NewReviewButton />
            <div className="bg-glass border border-frostedglass rounded-2xl p-7">
              <span className="flex gap-2 text-white pb-4 ">
                <Filter />
                <p>Фильтры</p>
              </span>
              <ul className="flex flex-col gap-2">
                {REVIEW_TABS.map((tab, index) => (
                  <li key={tab.id}>
                    <button
                      onClick={() => setActiveTab(index)}
                      className={`w-full py-3 px-4 hover:bg-frostedglass transition rounded-2xl flex items-center gap-2 ${
                        activeTab === index 
                          ? "bg-lightorange hover:bg-lightorange" 
                          : "text-gray-300"
                      }`}
                    >
                      {tab.icon}
                      {tab.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <HotDebate />
          </div>
          <div className="w-11/12">
            <SearchBar 
              reviewsCount={currentReviewsCount} 
              tabName={currentTabName} 
            />
            <div className="flex flex-col gap-5 pt-5">
              <ReviewCols reviews={TAB_DATA[activeTab]!} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};