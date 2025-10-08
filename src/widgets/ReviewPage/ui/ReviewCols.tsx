import type { StaticImageData } from "next/image";
import React from "react";
import { Reviews } from "~/features/Reviews";

export interface Review {
    author: string;
    film: string;
    rating : number;
    date: string;
    content: string;
    likes: number;
    comments: number;
    userRole: string;
    genres: string[];
    year: string;
    filmImage: StaticImageData; 
    userImage: StaticImageData; 
}

interface ReviewColsProps{
    reviews: Review[];
}

export const ReviewCols: React.FC<ReviewColsProps> = ({reviews}) => { 
    return(
        <div className="grid grid-cols-1 gap-4 pb-5">
            {reviews.map((review, index) => (
                <Reviews 
                    key={index}
                    review={review}
                />
            ))}
        </div>
    );
};