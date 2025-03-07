import { useState, useEffect } from 'react';
import { TMDBMovie } from '../types';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_API_BASE_URL;

export function useTMDB() {
  const [movies, setMovies] = useState<TMDBMovie[]>([]);
  const [tvShows, setTvShows] = useState<TMDBMovie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`
      );
      const data = await response.json();
      setMovies(data.results);
    } catch (err) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const fetchTvShows = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`
      );
      const data = await response.json();
      setTvShows(data.results);
    } catch (err) {
      setError('Failed to fetch TV shows');
    } finally {
      setLoading(false);
    }
  };

  const searchContent = async (query: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/search/multi?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
          query
        )}&page=1`
      );
      const data = await response.json();
      return data.results.filter(
        (item: any) => item.media_type === 'movie' || item.media_type === 'tv'
      );
    } catch (err) {
      setError('Failed to search content');
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
    fetchTvShows();
  }, []);

  return {
    movies,
    tvShows,
    loading,
    error,
    searchContent,
  };
}