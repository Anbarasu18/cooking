import React, { useState } from 'react';
import { Search, TrendingUp, Film, Tv2, Heart, PlayCircle, Menu, User } from 'lucide-react';
import { MovieCard } from './components/MovieCard';
import { LoginModal } from './components/LoginModal';
import { UserMenu } from './components/UserMenu';
import { useTMDB } from './hooks/useTMDB';
import { useStore } from './store/useStore';
import { TMDBMovie } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<TMDBMovie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<TMDBMovie | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const { movies, tvShows, loading, searchContent } = useTMDB();
  const { savedMovies, isLoggedIn, username } = useStore();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const results = await searchContent(searchQuery);
      setSearchResults(results);
      setActiveTab('search');
    }
  };

  const getActiveContent = () => {
    switch (activeTab) {
      case 'movies':
        return movies;
      case 'tv':
        return tvShows;
      case 'watchlist':
        return savedMovies;
      case 'search':
        return searchResults;
      default:
        return [...movies, ...tvShows].sort(() => Math.random() - 0.5).slice(0, 6);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav className="bg-gray-800 fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <PlayCircle className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold">StreamSavvy</span>
            </div>
            <div className="flex items-center space-x-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search movies & shows..."
                  className="bg-gray-700 text-white px-4 py-2 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="absolute right-3 top-2.5">
                  <Search className="h-5 w-5 text-gray-400" />
                </button>
              </form>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="p-2 rounded-full hover:bg-gray-700"
              >
                {isLoggedIn ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm">{username}</span>
                    <Menu className="h-5 w-5" />
                  </div>
                ) : (
                  <User className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* User Menu */}
      <UserMenu
        isOpen={isUserMenuOpen}
        onClose={() => setIsUserMenuOpen(false)}
        onLoginClick={() => setIsLoginModalOpen(true)}
      />

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

      {/* Content Tabs */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex space-x-6 mb-8">
            <button
              onClick={() => setActiveTab('trending')}
              className={`flex items-center space-x-2 ${
                activeTab === 'trending' ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              <TrendingUp className="h-5 w-5" />
              <span>Trending</span>
            </button>
            <button
              onClick={() => setActiveTab('movies')}
              className={`flex items-center space-x-2 ${
                activeTab === 'movies' ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              <Film className="h-5 w-5" />
              <span>Movies</span>
            </button>
            <button
              onClick={() => setActiveTab('tv')}
              className={`flex items-center space-x-2 ${
                activeTab === 'tv' ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              <Tv2 className="h-5 w-5" />
              <span>TV Shows</span>
            </button>
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`flex items-center space-x-2 ${
                activeTab === 'watchlist' ? 'text-blue-500' : 'text-gray-400'
              }`}
            >
              <Heart className="h-5 w-5" />
              <span>My Watchlist</span>
            </button>
          </div>

          {/* Selected Movie View */}
          {selectedMovie && (
            <div className="mb-8">
              <MovieCard movie={selectedMovie} expanded />
            </div>
          )}

          {/* Content Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {getActiveContent().map((item) => (
                <div key={item.id} onClick={() => setSelectedMovie(item)} className="cursor-pointer">
                  <MovieCard movie={item} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}