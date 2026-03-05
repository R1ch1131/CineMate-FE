// shared/config/api.ts
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINTS = {
  auth: {
    signIn: `${API_BASE_URL}/api/auth/sign-in`,
    signUp: `${API_BASE_URL}/api/auth/sign-up`,
    logout: `${API_BASE_URL}/api/auth/logout`,
    refresh: `${API_BASE_URL}/api/auth/refresh`,
  },
  movies: {
    newReleases: `${API_BASE_URL}/api/movies/new-releases`,
    topRated: `${API_BASE_URL}/api/movies/top-rated`,
    upcoming: `${API_BASE_URL}/api/movies/upcoming`,
    trending: `${API_BASE_URL}/api/movies/trending`,
  },
} as const;