"use client";

import React, { useState } from "react";
import { Reviews } from "~/features/Reviews";
import { PaginationReview } from "./PaginationReview";

export interface Review {
  id: string;
  userId: string;
  userName: string;
  movieId: number;
  movieTitle: string;
  moviePosterPath: string;
  movieReleaseDate: string;
  content: string;
  rating: number;
  likesCount: number;
  commentsCount: number;
  isSpoiler: boolean;
  createdAt: string;
  isLikedByCurrentUser: boolean;
  isFavoritedByCurrentUser: boolean;
  userRole?: string;
  genres?: string[];
  userImage?: string;
}

interface ReviewColsProps {
  reviews?: Review[];
  onActionSuccess?: () => void;
}

export const ReviewCols: React.FC<ReviewColsProps> = ({ reviews = [], onActionSuccess }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  
  const currentReviews = reviews.slice(firstIndex, lastIndex);

  if (reviews.length === 0) {
    return <div className="text-gray-500 text-center py-20 font-medium">Рецензий пока нет</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4">
        {currentReviews.map((review) => (
          <Reviews 
            key={review.id} 
            review={review} 
            onActionSuccess={onActionSuccess} 
          />
        ))}
      </div>

      {reviews.length > itemsPerPage && (
        <PaginationReview
          totalItems={reviews.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      )}
    </div>
  );
};