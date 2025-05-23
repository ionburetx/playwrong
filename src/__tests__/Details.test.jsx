import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Details from '../pages/Details'
import { BrowserRouter } from 'react-router-dom'
import * as api from '../services/api'

// Mock completo del módulo api
vi.mock('../services/api', () => ({
  getMovieById: vi.fn()
}))

// Mock más robusto de react-router-dom
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
    useNavigate: () => vi.fn()
  }
})

describe('Details', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetModules()
  })

  it('muestra el estado de carga inicial', async () => {
    // Prevenir resolución inmediata del mock
    api.getMovieById.mockImplementation(() => new Promise(() => {}))
    
    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>
    )
    
    expect(screen.getByTestId('loading-state')).toBeInTheDocument()
  })

  it('muestra los detalles de la película', async () => {
    const mockMovie = {
      id: 123,
      title: 'Test Movie',
      overview: 'Test description',
      backdrop_path: '/test-backdrop.jpg',
      release_date: '2024-01-01',
      vote_average: 8.5,
      runtime: 120,
      genres: [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Drama' }
      ]
    }

    api.getMovieById.mockResolvedValueOnce(mockMovie)

    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>
    )

    // Esperar explícitamente a que los datos se carguen
    await waitFor(() => {
      expect(screen.queryByTestId('loading-state')).not.toBeInTheDocument()
    }, { timeout: 3000 })

    // Verificar que la película se renderizó correctamente
    await waitFor(() => {
      expect(screen.getByTestId('movie-title')).toHaveTextContent('Test Movie')
      expect(screen.getByTestId('movie-overview')).toHaveTextContent('Test description')
      expect(screen.getByTestId('movie-runtime')).toHaveTextContent('120 minutes')
      expect(screen.getByTestId('movie-rating')).toHaveTextContent('8.5/10')
      expect(screen.getByTestId('play-button')).toBeInTheDocument()
    })

    // Verificar que la API fue llamada correctamente
    expect(api.getMovieById).toHaveBeenCalledTimes(1)
    expect(api.getMovieById).toHaveBeenCalledWith('123')
  })

  it('muestra error cuando falla la petición', async () => {
    const errorMessage = 'Error al cargar película'
    api.getMovieById.mockRejectedValueOnce(new Error(errorMessage))

    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>
    )

    await waitFor(() => {
      expect(screen.getByTestId('error-state')).toBeInTheDocument()
    }, { timeout: 3000 })
  })
})