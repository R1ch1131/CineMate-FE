"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Bookmark,
  Calendar,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Star,
  Flame,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import { FilmGenre } from "~/shared/ui/FilmGenre";
import { CommentSection } from "./CommentSection";
import Ava from "~/shared/assets/icons/noAvatar.jpg";
import clsx from "clsx";
import { ReviewForm } from "~/widgets/ReviewPage/ui/ReviewForm";
import type { QueryClient } from "@tanstack/react-query";

interface Comment {
  id: string;
  userName: string;
  content: string;
  likesCount: number;
  createdAt: string;
  parentId?: string;
  replies?: Comment[];
}

export interface Review {
  id: string;
  userId: string;
  movieTitle: string;
  movieReleaseDate?: string;
  moviePosterPath?: string;
  userName: string;
  userImage?: string;
  userRole?: string;
  rating: number;
  createdAt: string;
  content: string;
  isSpoiler: boolean;
  genres?: string[];
  likesCount: number;
  commentsCount: number;
  isLikedByCurrentUser?: boolean;
  isFavoritedByCurrentUser?: boolean;
}

interface ReviewsProps {
  review: Review;
  onActionSuccess?: () => void;
}

/** Обновляет одну рецензию во всех возможных ключах кеша */
function updateReviewInCache(
  queryClient: QueryClient,
  reviewId: string,
  updates: Partial<Review>,
  userId?: string,
  accessToken?: string,
  status?: string
) {
  const queryKeys: unknown[][] = [
    ["reviews", 0, userId],
    ["reviews", 1, userId],
    ["reviews", 2, userId],
    ["reviews", 3, userId],
    ["home-reviews", accessToken, status],
  ];

  queryKeys.forEach((queryKey) => {
    queryClient.setQueryData(queryKey, (old: unknown) => {
      if (!old) return old;
      if (typeof old !== "object") return old;

      const obj = old as Record<string, unknown>;
      // Структура: { content: Review[], totalElements, ... }
      if (Array.isArray(obj.content)) {
        return {
          ...old,
          content: (obj.content as Review[]).map((r) =>
            r.id === reviewId ? { ...r, ...updates } : r
          ),
        };
      }
      // Структура: Review[] (массив напрямую)
      if (Array.isArray(old)) {
        return (old as Review[]).map((r) =>
          r.id === reviewId ? { ...r, ...updates } : r
        );
      }
      return old;
    });
  });
}

export const Reviews: React.FC<ReviewsProps> = ({ review, onActionSuccess }) => {
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();

  const [localIsLiked, setLocalIsLiked] = useState<boolean>(review.isLikedByCurrentUser ?? false);
  const [localLikesCount, setLocalLikesCount] = useState<number>(review.likesCount);
  const [localIsFavorited, setLocalIsFavorited] = useState<boolean>(review.isFavoritedByCurrentUser ?? false);
  const [localCommentsCount, setLocalCommentsCount] = useState<number>(review.commentsCount);

  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [showSpoiler, setShowSpoiler] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [commentsLoaded, setCommentsLoaded] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isAuthor = session?.user?.id === review.userId;

  useEffect(() => {
    setLocalIsLiked(review.isLikedByCurrentUser ?? false);
    setLocalLikesCount(review.likesCount);
    setLocalIsFavorited(review.isFavoritedByCurrentUser ?? false);
    setLocalCommentsCount(review.commentsCount);
    setComments([]);
    setCommentsLoaded(false);
  }, [review]);

  const formattedDate = review.createdAt
    ? new Date(review.createdAt).toLocaleDateString("ru-RU")
    : "Недавно";

  const handleDelete = async () => {
    if (!window.confirm("Вы уверены, что хотите удалить эту рецензию?")) return;

    setIsDeleting(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/reviews/${review.id}`;
      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken ?? ""}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) throw new Error("Ошибка при удалении");

      setIsMenuOpen(false);
      onActionSuccess?.();
    } catch (error) {
      console.error(error);
      alert("Не удалось удалить рецензию");
    } finally {
      setIsDeleting(false);
    }
  };

  const { mutate: toggleLike } = useMutation({
    mutationFn: async () => {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/reviews/${review.id}/like`;
      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken ?? ""}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Like toggle failed");
    },
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [
          ["reviews", 0, session?.user?.id],
          ["reviews", 1, session?.user?.id],
          ["reviews", 2, session?.user?.id],
          ["reviews", 3, session?.user?.id],
          ["home-reviews", session?.user?.accessToken, status],
        ].flat() as unknown as any,
      });

      const wasLiked = localIsLiked;
      const newLiked = !wasLiked;
      const newCount = wasLiked ? Math.max(0, localLikesCount - 1) : localLikesCount + 1;

      setLocalIsLiked(newLiked);
      setLocalLikesCount(newCount);

      updateReviewInCache(
        queryClient,
        review.id,
        { isLikedByCurrentUser: newLiked, likesCount: newCount },
        session?.user?.id,
        session?.user?.accessToken,
        status
      );

      return { wasLiked, oldCount: localLikesCount };
    },
    onError: (_err, _variables, context) => {
      if (context) {
        setLocalIsLiked(context.wasLiked);
        setLocalLikesCount(context.oldCount);
        updateReviewInCache(
          queryClient,
          review.id,
          { isLikedByCurrentUser: context.wasLiked, likesCount: context.oldCount },
          session?.user?.id,
          session?.user?.accessToken,
          status
        );
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["reviews"] });
      void queryClient.invalidateQueries({ queryKey: ["home-reviews"] });
      onActionSuccess?.();
    },
  });

  const { mutate: toggleFavorite } = useMutation({
    mutationFn: async (isCurrentlyFavorited: boolean) => {
      const method = isCurrentlyFavorited ? "DELETE" : "POST";
      const url = `${process.env.NEXT_PUBLIC_API_URL}/reviews/${review.id}/favorite`;

      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${session?.user?.accessToken ?? ""}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) throw new Error("Favorite toggle failed");
    },
    onMutate: async (isCurrentlyFavorited) => {
      await queryClient.cancelQueries({
        queryKey: [
          ["reviews", 0, session?.user?.id],
          ["reviews", 1, session?.user?.id],
          ["reviews", 2, session?.user?.id],
          ["reviews", 3, session?.user?.id],
          ["home-reviews", session?.user?.accessToken, status],
        ].flat() as unknown as any,
      });

      setLocalIsFavorited(!isCurrentlyFavorited);
      updateReviewInCache(
        queryClient,
        review.id,
        { isFavoritedByCurrentUser: !isCurrentlyFavorited },
        session?.user?.id,
        session?.user?.accessToken,
        status
      );

      return { isCurrentlyFavorited };
    },
    onError: (_err, isCurrentlyFavorited, context) => {
      if (context) {
        setLocalIsFavorited(context.isCurrentlyFavorited);
        updateReviewInCache(
          queryClient,
          review.id,
          { isFavoritedByCurrentUser: context.isCurrentlyFavorited },
          session?.user?.id,
          session?.user?.accessToken,
          status
        );
      }
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["reviews"] });
      void queryClient.invalidateQueries({ queryKey: ["home-reviews"] });
      onActionSuccess?.();
    },
  });

  const fetchComments = useCallback(async () => {
    setIsLoadingComments(true);
    try {
      const headers: HeadersInit = { Accept: "*/*" };
      if (session?.user?.accessToken) {
        headers.Authorization = `Bearer ${session.user.accessToken}`;
      }
      const res = await fetch(`/api/reviews/${review.id}/comments?page=0&size=20`, { headers });
      const data = (await res.json()) as { content?: Comment[] };
      setComments(data.content ?? []);
      setCommentsLoaded(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingComments(false);
    }
  }, [review.id, session]);

  return (
    <div className="bg-glass border-frostedglass rounded-2xl border p-6 transition-all hover:border-white/10 relative overflow-visible">
      <div className="flex justify-between items-start gap-4">
        <div className="flex gap-4">
          <div className="relative h-32 w-21 shrink-0 overflow-hidden rounded-2xl border border-white/5 bg-white/5">
            <Image
              className="object-cover"
              src={review.moviePosterPath ?? "/placeholder-film.jpg"}
              alt={review.movieTitle}
              fill
              unoptimized
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <p className="text-xl font-bold text-white leading-tight">{review.movieTitle}</p>
              <p className="text-grey text-sm">
                ({review.movieReleaseDate ? new Date(review.movieReleaseDate).getFullYear() : "—"})
              </p>
              {review.isSpoiler && (
                <span className="bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] px-2 py-0.5 rounded-md uppercase font-bold tracking-wider">
                  Спойлер
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 bg-white/5 shrink-0">
                <Image className="object-cover" src={review.userImage ?? Ava} alt="avatar" fill unoptimized />
              </div>
              <Link href={"/profile"}>
                <p className="hover:text-lightorange text-white transition-colors cursor-pointer truncate max-w-[150px]">
                  {review.userName}
                </p>
              </Link>
            </div>

            <div className="text-grey flex gap-x-4 gap-y-2 items-center text-xs">
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <p className="text-[16px]">{formattedDate}</p>
              </div>
              <div className="flex flex-wrap gap-1">
                {review.genres?.map((genre, index) => (
                  <FilmGenre key={index} genre={genre} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 items-end shrink-0">
          <div className="flex items-center gap-2 rounded-2xl bg-black/10 px-3 py-2 border border-white/5">
            <Star 
              size={18} 
              className={clsx("fill-current", {
                'text-red-500': review.rating <= 4,
                'text-green-500': review.rating > 4 && review.rating <= 7,
                'text-yellow-400': review.rating > 7
              })} 
            />
            <p className={clsx("text-lg font-bold", {
                'text-red-500': review.rating <= 4,
                'text-green-500': review.rating > 4 && review.rating <= 7,
                'text-yellow-400': review.rating > 7
            })}>
              {review.rating}
            </p>
          </div>

          {isAuthor && (
            <div className="relative">
              <div
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-frostedglass hover:bg-grey/30 flex h-9 w-9 items-center justify-center rounded-full transition-all cursor-pointer text-grey hover:text-white"
              >
                <MoreHorizontal size={20} />
              </div>

              {isMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-44 bg-[#1e212f] border border-white/10 rounded-xl shadow-2xl z-20 overflow-hidden py-1">
                    <ReviewForm
                      isEdit={true}
                      initialData={{
                        id: review.id,
                        content: review.content,
                        isSpoiler: review.isSpoiler,
                        rating: review.rating,
                        movieId: Number(review.id), 
                        movieTitle: review.movieTitle,
                        moviePosterPath: review.moviePosterPath ?? "",
                        movieReleaseDate: review.movieReleaseDate ?? ""
                      }}
                      onSuccess={() => {
                        setIsMenuOpen(false);
                        onActionSuccess?.(); 
                      }}
                      trigger={
                        <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white hover:bg-white/5 transition-colors">
                          <Pencil size={15} className="text-amber-500" />
                          Редактировать
                        </button>
                      }
                    />

                    <button
                      onClick={() => { void handleDelete(); }}
                      disabled={isDeleting}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                    >
                      {isDeleting ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
                      Удалить
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="pt-3 relative">
        {review.isSpoiler && !showSpoiler ? (
          <div onClick={() => setShowSpoiler(true)} className="group relative cursor-pointer overflow-hidden rounded-xl border border-white/5">
            <div className="p-4 blur-[5px] opacity-40 select-none wrap-break-word text-gray-400 whitespace-pre-wrap">
              {review.content}
            </div>
            <div className="absolute inset-0 z-10 glass-spoiler flex flex-col items-center justify-center gap-1">
              <span className="text-[11px] text-white font-bold uppercase tracking-[0.2em] opacity-80">Контент скрыт</span>
              <span className="text-[9px] text-white/30">Нажми, чтобы открыть</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-300 p-4 leading-relaxed wrap-break-word whitespace-pre-wrap">{review.content}</p>
        )}
      </div>

      <div className="border-frostedglass mt-5 mb-3 w-full border-t" />

      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="flex gap-x-4 gap-y-2 flex-wrap">
          <button
            onClick={() => toggleLike()}
            disabled={!session}
            className={clsx(
              "bg-frostedglass flex items-center gap-1.5 rounded-xl px-3.5 py-2 transition-all hover:scale-105",
              localIsLiked ? "text-red-400 bg-red-400/10" : "text-grey hover:text-red-400"
            )}
          >
            <Heart width={17} className={clsx(localIsLiked && "fill-red-400")} />
            <p className="font-medium">{localLikesCount}</p>
          </button>

          <button
            onClick={() => {
              if (!isCommentsOpen && !commentsLoaded) {
                setIsCommentsOpen(true);
                void fetchComments();
              } else {
                setIsCommentsOpen(!isCommentsOpen);
              }
            }}
            className={clsx(
              "bg-frostedglass flex items-center gap-1.5 rounded-xl px-3.5 py-2 transition-all hover:scale-105",
              isCommentsOpen ? "text-blue-400 bg-blue-400/10" : "text-grey hover:text-blue-400"
            )}
          >
            <MessageCircle width={17} />
            <p className="font-medium">{localCommentsCount}</p>
          </button>

          <button
            onClick={() => toggleFavorite(localIsFavorited)}
            disabled={!session}
            className={clsx(
              "bg-frostedglass flex items-center gap-2 rounded-xl px-3.5 py-2 transition-all hover:scale-105",
              localIsFavorited ? "text-amber-300 bg-amber-300/10" : "text-grey hover:text-amber-300"
            )}
          >
            <Bookmark width={17} className={clsx(localIsFavorited && "fill-amber-300")} />
            <p className="text-sm font-medium">
              {localIsFavorited ? "В избранном" : "В избранное"}
            </p>
          </button>
        </div>

        <div className="flex gap-3 flex-wrap justify-end">
          <button className="flex items-center gap-2 rounded-xl bg-amber-600/20 px-3.5 py-2 text-amber-600 transition-all hover:bg-amber-600/30">
            <Flame width={17} className="fill-amber-600" />
            <p className="font-medium text-sm">Обсудить</p>
          </button>
        </div>
      </div>

      {isCommentsOpen && (
        <CommentSection
          reviewId={review.id}
          userImage={Ava}
          comments={comments}
          isLoading={isLoadingComments}
          onCommentSent={(newComment) => {
            // Оптимистично добавляем новый комментарий сразу
            if (newComment.parentId) {
              // Это ответ - добавляем как reply к родительскому комментарию
              setComments(prev => 
                prev.map(comment => 
                  comment.id === newComment.parentId
                    ? { ...comment, replies: [newComment, ...(comment.replies || [])] }
                    : comment
                )
              );
            } else {
              // Это обычный комментарий
              setComments(prev => [newComment, ...prev]);
            }
            setLocalCommentsCount(prev => prev + 1);
            // Фоновая синхронизация с сервером (НЕ вызывает полный рефетч Reviews)
            void fetchComments();
            // НЕ вызываем onActionSuccess?.() чтобы не триггерить рефетч всех рецензий
          }}
        />
      )}
    </div>
  );
}; 