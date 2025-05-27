// src/store/moviesStore.js
import { create } from 'zustand';
import api from '../services/api';

export const useMovieStore = create((set, get) => ({
  // State
  genreMovies: {}, // Cache for movies by genre
  genres: [], // Cache for genre list
  loading: false,
  error: null,

  // Actions
  fetchMoviesByGenre: async (genreId) => {
    const state = get();
    
    // Return cached data if available
    if (state.genreMovies[genreId]) {
      console.log('Returning cached data for genre:', genreId);
      return state.genreMovies[genreId];
    }

    // If not in cache, fetch from API
    try {
      console.log('Fetching from API for genre:', genreId);
      set({ loading: true, error: null });
      const response = await api.get(`/discover/movie?with_genres=${genreId}`);
      
      // Update cache with new movies
      set((state) => ({
        genreMovies: {
          ...state.genreMovies,
          [genreId]: response.data.results
        },
        loading: false
      }));

      return response.data.results;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Get movies from cache without fetching
  getMoviesFromCache: (genreId) => {
    const cachedMovies = get().genreMovies[genreId];
    console.log('Getting from cache for genre:', genreId, cachedMovies ? 'Found' : 'Not found');
    return cachedMovies || null;
  },

  // Clear cache (useful for testing or when data needs to be refreshed)
  clearCache: () => {
    console.log('Clearing cache');
    set({ genreMovies: {} });
  }
}));
