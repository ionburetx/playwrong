// src/store/moviesStore.js
import { create } from 'zustand';
import api from '../services/api';

export const useMovieStore = create((set, get) => ({
  // State
  movies: {}, // Store all movies: { movieId: movieData }
  genres: [], // Store all genres
  loading: false,
  error: null,

  // Fetch and cache all genres
  fetchGenres: async () => {
    const state = get();
    if (state.genres.length > 0) {
      console.log('Returning cached genres');
      return state.genres;
    }

    try {
      console.log('Fetching genres from API');
      const response = await api.get('/genre/movie/list');
      set({ genres: response.data.genres });
      return response.data.genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      throw error;
    }
  },

  // Get genre name by id
  getGenreName: (genreId) => {
    const state = get();
    const genre = state.genres.find(g => g.id === parseInt(genreId));
    return genre ? genre.name : 'Unknown Genre';
  },

  // Get all genre names for a movie
  getMovieGenreNames: (genreIds) => {
    if (!genreIds) return [];
    const state = get();
    return genreIds.map(id => {
      const genre = state.genres.find(g => g.id === id);
      return genre ? genre.name : 'Unknown Genre';
    });
  },

  // Fetch movies by genre
  fetchMoviesByGenre: async (genreId) => {
    try {
      console.log('Fetching movies from API for genre:', genreId);
      set({ loading: true, error: null });
      const response = await api.get(`/discover/movie?with_genres=${genreId}`);
      
      // Store all movies in our cache
      const moviesUpdate = {};
      response.data.results.forEach(movie => {
        moviesUpdate[movie.id] = movie;
      });

      set((state) => ({
        movies: {
          ...state.movies,
          ...moviesUpdate
        },
        loading: false
      }));

      // Return movies filtered by genre
      return response.data.results;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Get movies for a specific genre from cache
  getMoviesFromCache: (genreId) => {
    const state = get();
    const allMovies = Object.values(state.movies);
    console.log('Filtering cached movies for genre:', genreId);
    
    // Filter movies that have this genre ID
    return allMovies.filter(movie => 
      movie.genre_ids && movie.genre_ids.includes(parseInt(genreId))
    );
  },

  // Fetch and store movie details
  fetchMovieDetails: async (movieId) => {
    const state = get();
    
    // Return cached data if available
    if (state.movies[movieId]) {
      console.log('Returning cached movie:', movieId);
      return state.movies[movieId];
    }

    try {
      console.log('Fetching movie details from API:', movieId);
      set({ loading: true, error: null });
      const response = await api.get(`/movie/${movieId}`);
      
      // Store in cache
      set((state) => ({
        movies: {
          ...state.movies,
          [movieId]: response.data
        },
        loading: false
      }));

      return response.data;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },

  // Get movie details from cache
  getMovieDetailsFromCache: (movieId) => {
    const movie = get().movies[movieId];
    console.log('Getting movie from cache:', movieId, movie ? 'Found' : 'Not found');
    return movie || null;
  },

  // Clear cache
  clearCache: () => {
    console.log('Clearing cache');
    set({ movies: {}, genres: [] });
  }
}));
