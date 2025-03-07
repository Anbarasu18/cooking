import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TMDBMovie } from '../types';

interface StoreState {
  savedMovies: TMDBMovie[];
  isDarkMode: boolean;
  isLoggedIn: boolean;
  username: string | null;
  addSavedMovie: (movie: TMDBMovie) => void;
  removeSavedMovie: (movieId: number) => void;
  toggleDarkMode: () => void;
  login: (username: string) => void;
  logout: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
      savedMovies: [],
      isDarkMode: false,
      isLoggedIn: false,
      username: null,
      addSavedMovie: (movie) =>
        set((state) => ({
          savedMovies: [...state.savedMovies, movie],
        })),
      removeSavedMovie: (movieId) =>
        set((state) => ({
          savedMovies: state.savedMovies.filter((m) => m.id !== movieId),
        })),
      toggleDarkMode: () =>
        set((state) => ({
          isDarkMode: !state.isDarkMode,
        })),
      login: (username) =>
        set(() => ({
          isLoggedIn: true,
          username,
        })),
      logout: () =>
        set(() => ({
          isLoggedIn: false,
          username: null,
        })),
    }),
    {
      name: 'streamsavvy-storage',
    }
  )
);