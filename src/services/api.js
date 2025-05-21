// src/services/api.js
import axios from "axios"

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: "915966e619bc1bab9238399ad1fe6e90",
    language: "es-ES"
  }
})

export default api
