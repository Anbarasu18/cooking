export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  quality: string;
  resolution: string;
}

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average: number;
  release_date: string;
}