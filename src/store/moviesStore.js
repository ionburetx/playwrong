// src/store/moviesStore.js
import { create } from 'zustand';
import api from '../services/api';

export const useMovieStore = create((set, get) => ({
  // State
  movies: {}, // Store all movies: { movieId: movieData }
  trendingIds: [], // Store IDs of trending movies
  genres: [], // Store all genres
  genreMovies: {}, // Store movie IDs by genre: { genreId: [movieId1, movieId2, ...] }
  loading: false,
  loadingTrending: false,
  loadingGenres: false,
  error: null,

  // Fetch trending movies
  fetchTrending: async () => {
    const state = get();
    // If we're already loading or have data, don't fetch again
    if (state.loadingTrending || state.trendingIds.length > 0) {
      return state.trendingIds.map(id => state.movies[id]);
    }

    try {
      console.log('Fetching trending movies');
      set({ loadingTrending: true, error: null });
      
      const response = await api.get('/trending/movie/day');
      const trendingMovies = response.data.results;

      // Store movies in cache
      const moviesUpdate = {};
      trendingMovies.forEach(movie => {
        moviesUpdate[movie.id] = movie;
      });

      set((state) => ({
        movies: {
          ...state.movies,
          ...moviesUpdate
        },
        trendingIds: trendingMovies.map(movie => movie.id),
        loadingTrending: false
      }));

      return trendingMovies;
    } catch (error) {
      set({ error: error.message, loadingTrending: false });
      throw error;
    }
  },

  // Get trending movies from cache
  getTrendingFromCache: () => {
    const state = get();
    console.log('Getting trending movies from cache');
    return state.trendingIds.map(id => state.movies[id]).filter(Boolean);
  },

  // Fetch and cache all genres
  fetchGenres: async () => {
    const state = get();

    // Return cached genres if we have them
    if (state.genres.length > 0) {
      console.log('Using cached genres');
      return state.genres;
    }

    // Don't fetch if we're already loading
    if (state.loadingGenres) {
      console.log('Already loading genres, waiting...');
      //return state.genres;
    }

    try {
      console.log('Fetching genres from API');
      set({ loadingGenres: true, error: null });
      const response = await api.get('/genre/movie/list');
      const genres = response.data.genres;
      set((state) => ({ 
        genres, 
        loadingGenres: false 
      }));
      return genres;
    } catch (error) {
      console.error('Error fetching genres:', error);
      set({ loadingGenres: false });
      throw error;
    }
  },

  // Get genre name by id
  getGenreName: (genreId) => {
    const state = get();
    const parsedId = parseInt(genreId);
    
    if (!parsedId) {
      console.log('Invalid genre ID:', genreId);
      return '';
    }

    const genre = state.genres.find(g => g.id === parsedId);
    if (!genre) {
      console.log('Genre not found for ID:', genreId);
      return 'Unknown Genre';
    }

    return genre.name;
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
    const state = get();
    // If we're already loading this genre or have it cached, don't fetch again
    if (state.loadingGenres[genreId] || state.genreMovies[genreId]?.length > 0) {
      return state.genreMovies[genreId]?.map(id => state.movies[id]) || [];
    }

    try {
      console.log('Fetching movies from API for genre:', genreId);
      set((state) => ({ 
        loadingGenres: { ...state.loadingGenres, [genreId]: true },
        error: null 
      }));

      const response = await api.get(`/discover/movie?with_genres=${genreId}`);
      
      // Store all movies in our cache and keep track of IDs by genre
      const moviesUpdate = {};
      const movieIds = [];
      response.data.results.forEach(movie => {
        moviesUpdate[movie.id] = movie;
        movieIds.push(movie.id);
      });

      set((state) => ({
        movies: {
          ...state.movies,
          ...moviesUpdate
        },
        genreMovies: {
          ...state.genreMovies,
          [genreId]: movieIds
        },
        loadingGenres: { 
          ...state.loadingGenres, 
          [genreId]: false 
        }
      }));

      return response.data.results;
    } catch (error) {
      set((state) => ({ 
        loadingGenres: { ...state.loadingGenres, [genreId]: false },
        error: error.message
      }));
      throw error;
    }
  },

  // Get movies for a specific genre from cache
  getMoviesFromCache: (genreId) => {
    const state = get();
    console.log('Getting cached movies for genre:', genreId);
    
    // If we have cached IDs for this genre, return the corresponding movies
    if (state.genreMovies[genreId]?.length > 0) {
      return state.genreMovies[genreId]
        .map(id => state.movies[id])
        .filter(Boolean);
    }
    return null;
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
    set({ 
      movies: {}, 
      genres: [], 
      trendingIds: [],
      genreMovies: {} 
    });
  }
}));
