'use client';

import { Star } from "lucide-react";
import React, { useState } from "react";

export const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const ratingDetails: Record<number, { text: string; className: string }> = {
  1: { text: "Ужасно", className: "text-red-500 font-bold text-xl" },
  2: { text: "Плохо", className: "text-orange-500 font-bold text-xl" },
  3: { text: "Нормально", className: "text-yellow-500 font-bold text-xl" },
  4: { text: "Хорошо", className: "text-lime-500 font-bold text-xl" },
  5: { text: "Отлично", className: "text-green-500 font-bold text-xl" },
};

  const details = ratingDetails[rating];
  const displayRating = hoverRating || rating;

  return (
    <div className="flex items-center gap-8">
      <div className="flex" onMouseLeave={() => setHoverRating(0)}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{ cursor: "pointer" }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHoverRating(star)}
          >
            <Star
              size={40}
              className={`transition-transform duration-350 ${
                star <= displayRating ? "text-yellow-500" : "text-gray-500"
              } ${hoverRating === star ? "scale-125" : "scale-100"}`}
              fill={star <= displayRating ? "currentColor" : "none"}
            />
          </span>
        ))}
      </div>
      <div>
        <p className={rating === 0 ? "hidden" : details?.className}>
          {details ? ` ${rating}.0  ${details.text}` : ""}
        </p>
      </div>
    </div>
  );
};
