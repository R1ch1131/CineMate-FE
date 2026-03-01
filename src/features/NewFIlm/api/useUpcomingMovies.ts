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
  const response = await fetch('http://72.56.106.83:8080/api/movies/upcoming');
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data = await response.json();
  return data.slice(0, 4);
};

export const useUpcomingMovies = () => {
  return useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: fetchUpcomingMovies,
    staleTime: 5 * 60 * 1000, // 5 минут
    gcTime: 10 * 60 * 1000, // 10 минут
  });
};