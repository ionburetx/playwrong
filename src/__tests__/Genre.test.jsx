import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Genre from '../pages/Genre'
import { BrowserRouter } from 'react-router-dom'
import { getMoviesByGenre, getGenres } from '../services/api'

// Mock del módulo completo
vi.mock('../services/api', () => ({
  getMoviesByGenre: vi.fn(),
  getGenres: vi.fn()
}))

// Mock de useParams
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ genreId: '28' })
  }
})

describe('Genre', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('muestra el estado de carga inicialmente', () => {
    render(
      <BrowserRouter>
        <Genre />
      </BrowserRouter>
    )
    expect(screen.getByTestId('loading-state')).toBeInTheDocument()
  })

  it('muestra las películas del género seleccionado', async () => {
    const mockMovies = [
      { id: 1, title: 'Movie 1', poster_path: '/test1.jpg' },
      { id: 2, title: 'Movie 2', poster_path: '/test2.jpg' }
    ]

    const mockGenres = [
      { id: 28, name: 'Action' }
    ]

    getGenres.mockResolvedValue(mockGenres)
    getMoviesByGenre.mockResolvedValue(mockMovies)

    render(
      <BrowserRouter>
        <Genre />
      </BrowserRouter>
    )

    // Esperar a que el loading desaparezca
    await waitFor(() => {
      expect(screen.queryByTestId('loading-state')).not.toBeInTheDocument()
    })

    // Verificar que se muestra el título del género
    expect(screen.getByTestId('genre-title')).toHaveTextContent('Action')

    // Verificar que se muestran las tarjetas de películas
    expect(screen.getByTestId('movie-card-1')).toBeInTheDocument()
    expect(screen.getByTestId('movie-card-2')).toBeInTheDocument()
  })

  it('muestra error cuando falla la petición', async () => {
    getGenres.mockRejectedValue(new Error('Error al cargar género'))

    render(
      <BrowserRouter>
        <Genre />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByTestId('error-state')).toBeInTheDocument()
    })
  })
})