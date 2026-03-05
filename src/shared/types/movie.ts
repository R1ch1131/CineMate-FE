export type CastMember = {
  tmdbId: number;
  name: string;
  character: string;
  profilePath: string | null;
  order: number;
  profileUrl: string | null;
};

export type CrewMember = {
  tmdbId: number;
  name: string;
  job: string;
  profilePath: string | null;
  profileUrl: string | null;
};

export type MovieDetails = {
  id: number;
  tmdbId: number;
  title: string;
  overview: string;
  voteAverage: number;
  releaseDate: string;
  posterUrl: string;
  backdropUrl?: string;
  countries:string[];
  language:string;
  genres: string[];
  budget?: string;
  revenue?: string;
  runtime?: number;
  status?: string;
  tagline?: string;
  cast: CastMember[];
  directors: CrewMember[];
  writers: CrewMember[];   
  producers: CrewMember[]; 
  composers: CrewMember[]; 
  cinematographers: CrewMember[]; 
  editors: CrewMember[]; 
};