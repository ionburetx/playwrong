// src/store/moviesStore.js
import { create } from 'zustand'
import axios from 'axios'

const API_KEY = '915966e619bc1bab9238399ad1fe6e90' 

export const useMovieStore = create((set, get) => ({
  // Estado
  trending: [],
  moviesByGenre: {},
  movieDetails: {},
  genres: {},
  loading: false,
  error: null,

  // Obtener películas trending
  fetchTrending: async () => {
    // Si ya tenemos datos, retornarlos del caché
    if (get().trending.length > 0) {
      return get().trending
    }

    try {
      set({ loading: true })
      const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
      set({ trending: res.data.results, loading: false })
      return res.data.results
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  // Obtener películas por género
  fetchMoviesByGenre: async (genreId) => {
    // Si ya tenemos las películas de este género, retornarlas del caché
    if (get().moviesByGenre[genreId]) {
      return get().moviesByGenre[genreId]
    }

    try {
      set({ loading: true })
      const res = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`)
      set(state => ({
        moviesByGenre: {
          ...state.moviesByGenre,
          [genreId]: res.data.results
        },
        loading: false
      }))
      return res.data.results
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  // Obtener detalles de una película
  fetchMovieDetails: async (movieId) => {
    // Si ya tenemos los detalles, retornarlos del caché
    if (get().movieDetails[movieId]) {
      return get().movieDetails[movieId]
    }

    try {
      set({ loading: true })
      const res = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`)
      set(state => ({
        movieDetails: {
          ...state.movieDetails,
          [movieId]: res.data
        },
        loading: false
      }))
      return res.data
    } catch (error) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  // Limpiar caché (útil para forzar recargas o liberar memoria)
  clearCache: () => {
    set({
      trending: [],
      moviesByGenre: {},
      movieDetails: {},
      error: null
    })
  }
}))
