export interface Review {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  movieTitle: string;
  moviePosterPath?: string;
  movieReleaseDate?: string;
  content: string;
  rating: number;
  likesCount: number;
  commentsCount: number;
  isSpoiler: boolean;
  createdAt: string;
  isLikedByCurrentUser?: boolean;
  isFavoritedByCurrentUser?: boolean;
  genres?: string[];
}