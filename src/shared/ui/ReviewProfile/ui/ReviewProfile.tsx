import { Heart, MessageCircleCode, Star } from "lucide-react";
import Img from "~/shared/assets/icons/filmImage.jpg"

interface ReviewProfileProps {
  movieTitle: string;
  moviePosterPath?: string;
  movieReleaseDate?: string;
  content: string;
  rating: number;
  likesCount: number;
  commentsCount: number;
  createdAt: string;
}

export const ReviewProfile = ({
  movieTitle,
  moviePosterPath,
  movieReleaseDate,
  content,
  rating,
  likesCount,
  commentsCount,
  createdAt,
}: ReviewProfileProps) => {
  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Недавно";

  return (
    <div className="bg-frostedglass hover:bg-white/15 rounded-2xl flex justify-between transition-all hover:scale-101 gap-5 p-5 border border-white/25">
      <div>
        <img className="h-37 w-25 rounded-2xl object-cover shadow-2xl shadow-amber-500/30" src={moviePosterPath ?? Img.src} alt={movieTitle} />
      </div>
      <div className="flex-1">
        <div className="flex flex-col gap-2">
          <p className="text-xl">{movieTitle}</p>
          <p>{movieReleaseDate ? new Date(movieReleaseDate).getFullYear() : "—"}</p>
        </div>
        <p className="py-5">{content}</p>
        <div className="flex justify-between">
          <div className="flex gap-5">
            <button className="flex gap-1">
              <Heart width={17} />
              {likesCount}
            </button>
            <button className="flex gap-1">
              <MessageCircleCode width={17} />
              {commentsCount}
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between items-end">
        <div className="bg-amber-400 rounded-xl h-10 px-3 flex gap-1 items-center">
          <Star width={17} />
          <p>{rating}</p>
        </div>
        <p className="whitespace-nowrap pr-7 pb-1 text-sm">{formattedDate}</p>
      </div>
    </div>
  );
};