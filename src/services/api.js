// src/services/api.js
import axios from "axios"

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const API_URL = "https://api.themoviedb.org/3"


const api = axios.create({
  baseURL: API_URL,
  params: {
    api_key: API_KEY,
    language: "es-ES"
  }
})

export default api
