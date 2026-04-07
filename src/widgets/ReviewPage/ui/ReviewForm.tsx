"use client";

import { Check, Film, Plus, TriangleAlert, Loader2, Pencil } from "lucide-react";
import { useState, useEffect, type ReactNode } from "react";
import { Popup } from "../../../shared/ui/Popup/Popup";
import { Checkbox, Field, Label, Textarea, Input } from "@headlessui/react";
import Image from "next/image";
import { StarRating } from "./StarRating";
import { useSession } from "next-auth/react";

// Интерфейс фильма
interface Movie {
  id: string;
  tmdbId: number;
  title: string;
  overview: string;
  voteAverage: number;
  releaseDate: string;
  posterUrl: string;
  genres: string[];
}

// Описываем структуру данных для редактирования
interface ReviewInitialData {
  id: string | number;
  content: string;
  isSpoiler: boolean;
  rating: number;
  movieId: number;
  movieTitle: string;
  moviePosterPath: string;
  movieReleaseDate: string;
}

interface ReviewFormProps {
  initialData?: ReviewInitialData; // Заменили any на интерфейс
  isEdit?: boolean;
  onSuccess?: () => void;
  trigger?: ReactNode;
}

export const ReviewForm = ({ initialData, isEdit = false, onSuccess, trigger }: ReviewFormProps) => {
  const { data: session } = useSession();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [reviewText, setReviewText] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [rating, setRating] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  
  const maxChars = 1000;

  useEffect(() => {
    if (isEdit && initialData && isPopupOpen) {
      setReviewText(initialData.content || "");
      setEnabled(initialData.isSpoiler || false);
      setRating(initialData.rating || 0);
      setSelectedMovie({
        id: initialData.movieId.toString(),
        tmdbId: initialData.movieId,
        title: initialData.movieTitle,
        posterUrl: initialData.moviePosterPath,
        releaseDate: initialData.movieReleaseDate,
        overview: "",
        voteAverage: 0,
        genres: []
      });
    }
  }, [initialData, isEdit, isPopupOpen]);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const searchMovies = async (query: string, signal: AbortSignal) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/movies/search?query=${encodeURIComponent(query)}&page=0&size=10`,
        { signal }
      );
      if (!response.ok) throw new Error("Ошибка поиска");
      
      // Явная типизация ответа
      const data = (await response.json()) as Movie[];
      setSearchResults(Array.isArray(data) ? data : []);
    } catch (error: unknown) {
      // Правильная обработка unknown ошибки
      if (error instanceof Error && error.name !== "AbortError") {
        setSearchResults([]);
      }
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    if (isEdit || searchQuery.length < 2) return;
    
    const controller = new AbortController();
    const timer = setTimeout(() => {
      // Чтобы избежать "floating promise", просто вызываем функцию. 
      // Линтер может просить void, если функция внутри useEffect возвращает Promise.
      void searchMovies(searchQuery, controller.signal);
    }, 600);

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [searchQuery, isEdit]);

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setTimeout(() => {
      setReviewText("");
      setRating(0);
      setEnabled(false);
      setSelectedMovie(null);
      setSearchQuery("");
      setSearchResults([]);
    }, 200);
  };

  const handleSubmit = async () => {
    if (!selectedMovie || reviewText.trim().length < 10 || rating === 0) {
      alert("Заполните все поля");
      return;
    }

    setIsSubmitting(true);

    try {
      const url = isEdit && initialData ? `/reviews/${initialData.id}` : '/reviews';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session?.user?.accessToken}`
        },
        body: JSON.stringify({
          movieId: selectedMovie.tmdbId,
          movieTitle: selectedMovie.title,
          moviePosterPath: selectedMovie.posterUrl,
          movieReleaseDate: selectedMovie.releaseDate,
          content: reviewText,
          rating: rating,
          isSpoiler: enabled
        }),
      });

      if (response.ok) {
        if (onSuccess) onSuccess(); 
        handleClosePopup();
      } else {
        const errorText = await response.text();
        alert(`Ошибка: ${errorText}`);
      }
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
      alert("Произошла ошибка при сохранении.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div onClick={() => setIsPopupOpen(true)} className="w-full">
        {trigger ?? (
  <div className="from-lightorange to-darkorange flex h-14 w-full cursor-pointer items-center justify-center gap-2 rounded-2xl bg-gradient-to-r text-white shadow-lg hover:opacity-90 transition-opacity">
    <Plus className="h-5 w-5" />
    <p className="font-medium">Написать рецензию</p>
  </div>
)}
      </div>

      {isPopupOpen && (
        <Popup isOpen={isPopupOpen} onClose={handleClosePopup}>
          <div className="w-[95vw] sm:w-[600px] max-h-[95vh] overflow-y-auto bg-[#0a0a0a] rounded-2xl flex flex-col scrollbar-hide border border-white/5 shadow-2xl text-left">
            
            <div className="flex h-20 w-full shrink-0 items-center gap-4 rounded-t-2xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 pl-6 border-b border-white/5">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 shadow-orange-500/20 shadow-lg">
                {isEdit ? <Pencil className="h-5 w-5 text-white" /> : <Film className="h-5 w-5 text-white" />}
              </div>
              <div>
                <p className="font-bold text-white text-lg">
                  {isEdit ? "Редактировать рецензию" : "Написать рецензию"}
                </p>
                <p className="text-xs text-gray-400">
                  {isEdit ? "Внесите изменения в свой отзыв" : "Поделитесь своим мнением о фильме"}
                </p>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">Фильм</p>
                {!selectedMovie ? (
                  <div className="relative">
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Введите название фильма..."
                      className="block w-full rounded-xl border-none bg-white/5 px-4 py-3 text-sm text-white focus:ring-2 focus:ring-amber-600 transition-all outline-none"
                    />
                    {isSearching && <Loader2 className="absolute right-4 top-3 h-5 w-5 animate-spin text-amber-500" />}
                    {searchQuery.length >= 2 && searchResults.length > 0 && (
                      <div className="absolute z-50 mt-2 w-full rounded-xl bg-[#1a1a1a] border border-white/10 shadow-2xl overflow-hidden">
                        {searchResults.map((movie) => (
                          <div 
                            key={movie.tmdbId} 
                            onClick={() => { setSelectedMovie(movie); setSearchQuery(""); }} 
                            className="flex items-center gap-4 p-3 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-none"
                          >
                            <div className="relative w-10 h-14 shrink-0">
                               <Image src={movie.posterUrl || '/no-poster.png'} alt="" fill className="object-cover rounded" unoptimized />
                            </div>
                            <div className="text-left">
                                <h4 className="text-white text-sm font-medium">{movie.title}</h4>
                                <p className="text-xs text-gray-500">{movie.releaseDate?.split('-')[0]}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="relative flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-amber-600/20">
                    <div className="relative w-16 h-24 shrink-0">
                      <Image src={selectedMovie.posterUrl || '/no-poster.png'} alt="" fill className="object-cover rounded-lg" unoptimized />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="text-white font-bold text-lg leading-tight">{selectedMovie.title}</h3>
                      {!isEdit && (
                        <button onClick={() => setSelectedMovie(null)} className="mt-2 text-[10px] text-amber-500 font-bold uppercase hover:underline">
                          Изменить фильм
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">Ваша оценка</p>
                <StarRating onChange={setRating} />
              </div>
              
              <div className="space-y-3">
                <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">Ваша рецензия</p>
                <Textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Опишите свои впечатления..."
                  className="bg-white/5 block w-full resize-none rounded-xl border-none px-4 py-3 text-sm text-white focus:ring-2 focus:ring-amber-600 min-h-[140px] outline-none"
                />
                <div className="flex justify-between text-[11px] font-bold uppercase text-gray-500">
                  <span className={reviewText.length > maxChars ? "text-red-500" : ""}>
                    {reviewText.length} / {maxChars}
                  </span>
                </div>
              </div>

              <div className="py-2 border-y border-white/5">
                <Field className="flex items-center gap-3 cursor-pointer group">
                  <Checkbox 
                    checked={enabled} 
                    onChange={setEnabled} 
                    className="group size-6 rounded-lg border border-white/10 bg-white/5 p-1 data-[checked]:bg-amber-600 flex items-center justify-center transition-colors"
                  >
                    <Check className="hidden size-4 text-white group-data-[checked]:block stroke-[3px]" />
                  </Checkbox>
                  <div className="flex items-center gap-2">
                    <TriangleAlert className="h-4 w-4 text-amber-500" />
                    <Label className="text-sm text-gray-300 cursor-pointer">Рецензия содержит спойлеры</Label>
                  </div>
                </Field>
              </div>
            </div>

            <div className="bg-white/[0.02] border-t border-white/5 p-6 mt-auto">
              <div className="flex items-center justify-end gap-3">
                <button 
                  type="button"
                  onClick={handleClosePopup} 
                  className="rounded-xl bg-white/5 px-6 py-3 text-sm font-bold text-white hover:bg-white/10 transition-colors"
                >
                  Отмена
                </button>
                <button 
                  type="button"
                  onClick={handleSubmit}
                  disabled={reviewText.trim().length < 10 || rating === 0 || isSubmitting}
                  className="rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-8 py-3 text-sm font-black text-white shadow-lg disabled:opacity-20 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    isEdit ? "СОХРАНИТЬ" : "ОПУБЛИКОВАТЬ"
                  )}
                </button>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
};