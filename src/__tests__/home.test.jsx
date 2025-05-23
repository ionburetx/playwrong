import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Home from '../pages/home'
import { BrowserRouter } from 'react-router-dom'
import { getMoviesByGenre } from '../services/api'

// Mock TrendingList component
vi.mock('../components/TrendingList', () => ({
  default: () => <div data-testid="trending-section">Trending Movies</div>
}))

// Mock API
vi.mock('../services/api', () => ({
  getMoviesByGenre: vi.fn()
}))

describe('Home', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('muestra el estado de carga inicial', () => {
    getMoviesByGenre.mockImplementation(() => new Promise(() => {}))
    
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    
    expect(screen.getByTestId('loading-state')).toBeInTheDocument()
  })

  it('muestra las secciones de películas por género', async () => {
    const mockMovies = [
      { id: 1, title: 'Movie 1', poster_path: '/test1.jpg' },
      { id: 2, title: 'Movie 2', poster_path: '/test2.jpg' }
    ]

    getMoviesByGenre
      .mockResolvedValueOnce(mockMovies)  // Action movies
      .mockResolvedValueOnce(mockMovies)  // Drama movies
      .mockResolvedValueOnce(mockMovies); // Comedy movies

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )

    // Verificar estado de carga
    expect(screen.getByTestId('loading-state')).toBeInTheDocument()

    // Esperar que se carguen los datos
    await waitFor(() => {
      expect(screen.queryByTestId('loading-state')).not.toBeInTheDocument()
    })

    // Verificar que se llamó a la API para cada género
    expect(getMoviesByGenre).toHaveBeenCalledTimes(3)
    expect(getMoviesByGenre).toHaveBeenCalledWith('28') // Action
    expect(getMoviesByGenre).toHaveBeenCalledWith('18') // Drama
    expect(getMoviesByGenre).toHaveBeenCalledWith('35') // Comedy
  })
})