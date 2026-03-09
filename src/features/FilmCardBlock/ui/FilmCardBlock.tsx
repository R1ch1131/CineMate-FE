import { useQuery } from "@tanstack/react-query";
import { FilmCard } from "~/entities/FilmCard/ui/FilmCard";

type Movie = {
  id: number;
  tmdbId:number;
  title: string;
  overview: string;
  voteAverage?: number;
  releaseDate: string;
  posterUrl: string;
  genres: string;
};

type Category = 'new-releases' | 'top-rated' | 'trending' | 'upcoming';

const fetchMoviesByCategory = async (category: Category): Promise<Movie[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/movies/${category}`);

  if (!res.ok) {
    throw new Error(`Ошибка при загрузке фильмов категории: ${category}`);
  }

  const data = (await res.json()) as Movie[];
  return data;
};

type FilmCardBlockProps = {
  category: Category;
  title?: string;
};

export default function FilmCardBlock({ category, title }: FilmCardBlockProps) {
  const { data: movies, isLoading, error } = useQuery({
    queryKey: ["movies", category],
    queryFn: () => fetchMoviesByCategory(category),
  });

  const categoryTitles = {
    'new-releases': 'Новинки',
    'top-rated': 'Высокий рейтинг',
    'trending': 'Популярное',
    'upcoming': 'Скоро в кино'
  };

  return (
    <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-4">
      {title && <h2 className="text-2xl font-bold text-white">{title}</h2>}
      <div>
        <div className="grid grid-cols-5 gap-8">
          {isLoading && (
            <p className="text-white col-span-5 text-center">Загрузка...</p>
          )}
          
          {error && (
            <p className="text-red-500 col-span-5 text-center">{error.message}</p>
          )}
          
          {!isLoading && !error && movies?.map((movie) => (
            <FilmCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};