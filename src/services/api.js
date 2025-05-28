// src/services/api.js instancia de axios para hacer peticiones a la API de TMDB
import axios from "axios"

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
    language: "es-ES"
  }
})

export default api
