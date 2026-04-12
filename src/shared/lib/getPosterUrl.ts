const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

/**
 *
 * @param posterPath 
 * @returns 
 */
export function getPosterUrl(posterPath: string | null | undefined): string {
  if (!posterPath) return "";
  return `${TMDB_IMAGE_BASE_URL}${posterPath}`;
}
