import { useQuery } from '@tanstack/react-query';

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

const fetchUpcomingMovies = async (): Promise<Movie[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/movies/upcoming`);

  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }

  const data = (await response.json()) as unknown as Movie[];

  return data.slice(0, 4);
};

export const useUpcomingMovies = () => {
  return useQuery<Movie[]>({
    queryKey: ['upcomingMovies'],
    queryFn: fetchUpcomingMovies,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
};