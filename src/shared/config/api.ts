export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ENDPOINTS = {
  auth: {
    signIn: `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`,
    signUp: `${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`,
    logout: `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
    refresh: `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
  },
  movies: {
    newReleases: `${process.env.NEXT_PUBLIC_API_URL}/movies/new-releases`,
    topRated: `${process.env.NEXT_PUBLIC_API_URL}/movies/top-rated`,
    upcoming: `${process.env.NEXT_PUBLIC_API_URL}/movies/upcoming`,
    trending: `${process.env.NEXT_PUBLIC_API_URL}/movies/trending`,
  },
} as const;