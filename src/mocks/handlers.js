import { http, HttpResponse } from 'msw'
import populares from './populares.json'

// Usar directamente los datos del archivo json
const mockMovies = populares

export const handlers = [
  // Mock para trending movies
  http.get('https://api.themoviedb.org/3/trending/movie/day', () => {
    return HttpResponse.json({
      page: 1,
      results: mockMovies,
      total_pages: 1,
      total_results: mockMovies.length
    })
  }),

  // Mock para detalles de una película específica
  http.get('https://api.themoviedb.org/3/movie/:id', ({ params }) => {
    const movie = mockMovies.find(m => m.id === Number(params.id))
    if (movie) {
      return HttpResponse.json(movie)
    }
    return new HttpResponse(null, { status: 404 })
  }),

  // Mock para géneros de películas
  http.get('https://api.themoviedb.org/3/genre/movie/list', () => {
    return HttpResponse.json({
      genres: [
        { id: 28, name: "Acción" },
        { id: 12, name: "Aventura" },
        { id: 35, name: "Comedia" }
      ]
    })
  }),

  // Mock para búsqueda de películas
  http.get('https://api.themoviedb.org/3/search/movie', () => {
    return HttpResponse.json({
      page: 1,
      results: mockMovies,
      total_pages: 1,
      total_results: mockMovies.length
    })
  })
]