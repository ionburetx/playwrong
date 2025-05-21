// src/store/moviesStore.js
import { create } from 'zustand'
import axios from 'axios'

const API_KEY = 'TU_API_KEY'

export const useMovieStore = create((set) => ({
  trending: [],
  genres: {},
  fetchTrending: async () => {
    const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`)
    set({ trending: res.data.results })
  },
}))
