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
      ? `${process.env.NEXT_PUBLIC_API_URL}/api/movies`
      : `${process.env.NEXT_PUBLIC_API_URL}/api/movies/${category}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Ошибка загрузки фильмов");
  }

  return (await res.json()) as Movie[];
};

export default function FilmCardBlock({ category }: { category: Category }) {
  const { data, isLoading, error } = useQuery<Movie[]>({
    queryKey: ["movies", category],
    queryFn: () => fetchMovies(category),
  });

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

  return (
    <div className="mx-auto mt-8 grid max-w-7xl grid-cols-5 gap-8">
      {data?.map((movie) => (
        <FilmCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}