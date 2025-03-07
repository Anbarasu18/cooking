import React from 'react';
import { Heart } from 'lucide-react';
import { TMDBMovie } from '../types';
import { useStore } from '../store/useStore';

interface MovieCardProps {
  movie: TMDBMovie;
  expanded?: boolean;
}

export function MovieCard({ movie, expanded = false }: MovieCardProps) {
  const { savedMovies, addSavedMovie, removeSavedMovie } = useStore();
  const isSaved = savedMovies.some((m) => m.id === movie.id);

  const toggleSave = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card expansion when clicking save button
    if (isSaved) {
      removeSavedMovie(movie.id);
    } else {
      addSavedMovie(movie);
    }
  };

  const formatRating = (rating: number) => {
    return typeof rating === 'number' ? rating.toFixed(1) : 'N/A';
  };

  const formatYear = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? 'N/A' : date.getFullYear().toString();
  };

  if (expanded) {
    return (
      <div className="relative bg-gray-800 rounded-xl overflow-hidden">
        <img
          src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent">
          <div className="absolute bottom-0 p-8 w-full">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">{movie.title}</h2>
              <button
                onClick={toggleSave}
                className={`p-2 rounded-full ${
                  isSaved ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Heart className={`h-6 w-6 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>
            <div className="mt-4 flex items-center space-x-4">
              <span className="text-yellow-400 text-lg">★ {formatRating(movie.vote_average)}</span>
              <span className="text-gray-300">{formatYear(movie.release_date)}</span>
            </div>
            <p className="mt-4 text-gray-300 text-lg leading-relaxed">{movie.overview}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full h-96 object-cover rounded-lg transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-0 p-4 w-full">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{movie.title}</h3>
            <button
              onClick={toggleSave}
              className={`p-2 rounded-full ${
                isSaved ? 'bg-red-500' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <Heart className={`h-5 w-5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
          <div className="flex items-center mt-2">
            <span className="text-yellow-400">★ {formatRating(movie.vote_average)}</span>
            <span className="mx-2">•</span>
            <span className="text-gray-300">{formatYear(movie.release_date)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}