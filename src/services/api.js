// src/services/api.js
import axios from "axios"

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "915966e619bc1bab9238399ad1fe6e90",
    language: "es-ES"
  }
})

const getMoviesByGenre = async (genreId) => {
  try {
    const response = await api.get('/discover/movie', {
      params: {
        with_genres: genreId,
        sort_by: 'popularity.desc'
      }
    })
    return response.data.results
  } catch (error) {
    console.error('Error fetching movies by genre:', error)
    throw error
  }
}

const getGenres = async () => {
  try {
    const response = await api.get('/genre/movie/list')
    return response.data.genres
  } catch (error) {
    console.error('Error fetching genres:', error)
    throw error
  }
}

export { api as default, getMoviesByGenre, getGenres }
