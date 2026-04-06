// StarRating.tsx
'use client';
import { Star } from "lucide-react";
import React, { useState } from "react";

interface StarRatingProps {
  onChange: (rating: number) => void; // Добавляем пропс
}

export const StarRating = ({ onChange }: StarRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const ratingDetails: Record<number, { text: string; className: string }> = {
    1: { text: "Ужасно", className: "text-red-500 font-bold text-xl" },
    2: { text: "Ужасно", className: "text-red-500 font-bold text-xl" },
    3: { text: "Плохо", className: "text-orange-500 font-bold text-xl" },
    4: { text: "Плохо", className: "text-orange-500 font-bold text-xl" },
    5: { text: "Нормально", className: "text-yellow-500 font-bold text-xl" },
    6: { text: "Нормально", className: "text-yellow-500 font-bold text-xl" },
    7: { text: "Хорошо", className: "text-lime-500 font-bold text-xl" },
    8: { text: "Хорошо", className: "text-lime-500 font-bold text-xl" },
    9: { text: "Отлично", className: "text-green-500 font-bold text-xl" },
    10: { text: "Отлично", className: "text-green-500 font-bold text-xl" },
  };

  const handleRate = (val: number) => {
    setRating(val);
    onChange(val); 
  };

  const displayRating = hoverRating || rating;
  const details = ratingDetails[rating];

  return (
    <div className="flex items-center gap-8">
      <div className="flex" onMouseLeave={() => setHoverRating(0)}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
          <span
            key={star}
            className="cursor-pointer"
            onClick={() => handleRate(star)}
            onMouseEnter={() => setHoverRating(star)}
          >
            <Star
              size={30}
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