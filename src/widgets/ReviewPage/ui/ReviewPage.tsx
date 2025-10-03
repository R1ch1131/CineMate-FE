"use client";

import { FiltersReviews } from "./FiltersReviews";
import { HotDebate } from "./HotDebate";
import { Reviews } from "~/features/Reviews";
import { SearchBar } from "./SearchBar";
import { NewReviewButton } from "./NewReviewButton";

export const ReviewPage = () =>{
    return(
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
            <FiltersReviews />
            <HotDebate />
          </div>
          <div className="w-11/12">
            <SearchBar />
            <div className="flex flex-col gap-5 pt-5">
              <Reviews />
              <Reviews />
              <Reviews />
              <Reviews />
            </div>
          </div>
        </div>
      </div>
        </div>
    )
}