import { useQuery } from "@tanstack/react-query";
import { FilmCard } from "~/entities/FilmCard/ui/FilmCard";
import type { Category } from "~/shared/types/category";
import { useEffect } from "react";

type Movie = {
  id: number;
  tmdbId: number;
  title: string;
  overview: string;
  voteAverage?: number;
  releaseDate: string;
  posterUrl: string;
  genres: string;
};

type Props = {
  category: Category;
  viewMode: "grid" | "list";
  searchQuery: string;
  page: number;
  onTotalPagesChange: (pages: number) => void;
};

const ITEMS_PER_PAGE = 20;

const fetchMovies = async (category: Category): Promise<Movie[]> => {
  if (category === "all") {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/list/all`);
    if (!res.ok) throw new Error("Ошибка загрузки");

    const data: unknown = await res.json();
    if (!Array.isArray(data)) throw new Error("Неверный формат данных");

    return data.map(item => item as Movie);
  }

  const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/movies/${category}`;
  let page = 0;
  const size = 20;
  let allMovies: Movie[] = [];

  while (true) {
    const res = await fetch(`${BASE_URL}?page=${page}&size=${size}`);
    if (!res.ok) throw new Error("Ошибка загрузки");

    const data: unknown = await res.json();
    if (!Array.isArray(data)) break;

    allMovies = [...allMovies, ...(data as Movie[])];

    if (data.length < size) break;
    page++;
  }

  return allMovies;
};

const filterMoviesBySearch = (movies: Movie[], searchQuery: string) => {
  if (!searchQuery.trim()) return movies;
  const query = searchQuery.toLowerCase().trim();
  return movies.filter(movie => movie.title.toLowerCase().includes(query));
};

export default function FilmCardBlock({
  category,
  viewMode,
  searchQuery,
  page,
  onTotalPagesChange
}: Props) {
  const { data, isLoading, error } = useQuery<Movie[]>({
    queryKey: ["movies", category],
    queryFn: () => fetchMovies(category),
  });

  const filteredMovies = data ? filterMoviesBySearch(data, searchQuery) : [];
  const totalPages = Math.ceil(filteredMovies.length / ITEMS_PER_PAGE);

  useEffect(() => {
    onTotalPagesChange(totalPages);
  }, [totalPages, onTotalPagesChange]);

  const paginatedMovies = filteredMovies.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Ошибка загрузки</p>;
  }

  if (filteredMovies.length === 0 && searchQuery) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center">
        <p className="text-xl text-gray-400 mb-2">Ничего не найдено</p>
        <p className="text-gray-500">Попробуйте изменить поисковый запрос</p>
      </div>
    );
  }

  return (
    <div className={`mx-auto mt-8 max-w-7xl ${
      viewMode === "grid"
        ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8"
        : "flex flex-col gap-4"
    }`}>
      {paginatedMovies.map(movie => (
        <FilmCard key={movie.id} movie={movie} variant={viewMode} />
      ))}
    </div>
  );
}