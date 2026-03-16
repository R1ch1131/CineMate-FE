import { useQuery } from "@tanstack/react-query";
import { FilmCard } from "~/entities/FilmCard/ui/FilmCard";
import type { Category } from "~/shared/types/category";

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

const fetchMovies = async (category: Category): Promise<Movie[]> => {
  const url =
    category === "all"
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/movies/list/all`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/movies/${category}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Ошибка загрузки фильмов");
  }

  return (await res.json()) as Movie[];
};

const filterMoviesBySearch = (movies: Movie[], searchQuery: string): Movie[] => {
  if (!searchQuery.trim()) return movies;
  
  const query = searchQuery.toLowerCase().trim();
  return movies.filter(movie => 
    movie.title.toLowerCase().includes(query)
  );
};

export default function FilmCardBlock({ 
  category,
  viewMode,
  searchQuery
}: { 
  category: Category;
  viewMode: "grid" | "list";
  searchQuery: string;
}) {
  const { data, isLoading, error } = useQuery<Movie[]>({
    queryKey: ["movies", category],
    queryFn: () => fetchMovies(category),
  });

  const filteredMovies = data ? filterMoviesBySearch(data, searchQuery) : [];

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
      {filteredMovies.map((movie) => (
        <FilmCard key={movie.id} movie={movie} variant={viewMode} />
      ))}
    </div>
  );
}