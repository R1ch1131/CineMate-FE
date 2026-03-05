import React, { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { Property } from "~/entities/Property";
import {
  Bookmark,
  Calendar,
  Flag,
  Flame,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
  Star,
} from "lucide-react";
import { FilmGenre } from "~/shared/ui/FilmGenre";
import { CommentSection } from "./CommentSection";



interface ReviewsProps {
  review: {
    author: string;
    film: string;
    rating: number;
    date: string;
    content?: string;
    likes: number;
    comments: number;
    userRole: string;
    genres: string[];
    year: string;
    filmImage: StaticImageData | string;
    userImage: StaticImageData | string;
  };
}

export const Reviews: React.FC<ReviewsProps> = ({ review }) => {
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const mockComments = [
    {
      id: 1,
      author: "John Doe",
      date: "12 дн назад",
      text: "This is a great review!",
      likeCount: "3",
    },
    {
      id: 2,
      author: "Jane Smith",
      date: "10 дн назад",
      text: "I totally agree with your points.",
      likeCount: "42",
    },
  ];

  return (
    <div className="bg-glass border-frostedglass rounded-2xl border p-6">
      <div>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Image
              className="h-27 w-17 rounded-2xl object-cover"
              src={review.filmImage}
              alt={"фильм"}
            />
            <div className="flex flex-col gap-2">
              <span className="flex items-center gap-3">
                <p className="text-xl font-bold text-white">{review.film}</p>
                <p className="text-grey">({review.year})</p>
              </span>
              <div className="flex items-center gap-3">
                <Image
                  className="h-10 w-10 rounded-full object-cover"
                  src={review.userImage}
                  alt="user"
                />
                <Link href={"/profile"}>
                  <p className="hover:text-lightorange text-white">
                    {review.author}
                  </p>
                </Link>
                <Property
                  text={review.userRole}
                  color={"bg-lightorange/50 !px-2 !py-0.5"}
                  textColor={"text-amber-200 !text-sm"}
                />
              </div>
              <div className="text-grey flex gap-2">
                <div className="flex items-center gap-1">
                  <Calendar />
                  <p>{review.date} дн назад</p>
                </div>
                <div className="flex gap-1">
                  {review.genres.map((genre, index) => (
                    <FilmGenre key={index} genre={genre} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 rounded-2xl bg-black/30 px-3 py-2 text-green-500">
              <Star className="fill-current" />
              <p className="text-lg font-bold">{review.rating}</p>
            </div>
            <div className="flex justify-end">
              <div className="bg-frostedglass center hover:bg-grey/30 flex h-9 w-9 rounded-full transition-transform duration-400 hover:scale-105">
                <MoreHorizontal className="text-grey h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
        <div className="pt-4">
          <p className="text-gray-300">{review.content}</p>
        </div>
        <div className="border-frostedglass mt-5 mb-3 w-full border-t-2" />
        <div className="flex justify-between">
          <div className="flex gap-5">
            <button className="bg-frostedglass text-grey center hover:bg-grey/30 flex gap-1.5 rounded-xl px-3.5 transition-transform duration-400 hover:scale-105 hover:font-medium hover:text-red-400/80">
              <Heart width={17} />
              <p>{review.likes}</p>
            </button>
            <button
              onClick={() => setIsCommentsOpen(!isCommentsOpen)}
              className="bg-frostedglass text-grey center hover:bg-grey/30 flex gap-1.5 rounded-xl px-3.5 transition-transform duration-400 hover:scale-105 hover:font-medium hover:text-blue-400/80"
            >
              <MessageCircle width={17} />
              <p>{review.comments}</p>
            </button>
            <button className="bg-frostedglass text-grey hover:bg-grey/30 flex gap-2 rounded-xl px-3.5 py-2 transition-transform duration-400 hover:scale-105 hover:text-amber-300/80">
              <Bookmark width={17} />
              <p>В избранное</p>
            </button>
          </div>
          <div className="flex gap-3">
            <button className="flex gap-2 rounded-xl bg-amber-600/30 px-3.5 py-2 text-amber-600 transition-transform hover:scale-103 hover:bg-amber-600/50">
              <Flame width={17} className="fill-amber-600" />
              <p>Обсудить</p>
            </button>
            <button className="bg-frostedglass text-grey center hover:bg-grey/30 flex h-10 w-10 rounded-full transition-transform duration-400 hover:scale-105 hover:font-medium hover:text-green-400/80">
              <Share2 width={17} />
            </button>
            <button className="bg-frostedglass text-grey center hover:bg-grey/30 flex h-10 w-10 rounded-full transition-transform duration-400 hover:scale-105 hover:font-medium hover:text-red-400/80">
              <Flag width={17} />
            </button>
          </div>
        </div>
        {isCommentsOpen && (
          <CommentSection
            userImage={review.userImage}
            comments={mockComments}
          />
        )}
      </div>
    </div>
  );
};