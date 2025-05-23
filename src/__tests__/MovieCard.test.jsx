import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import MovieCard from '../components/MovieCard.jsx' // Asegúrate de que la extensión sea correcta
import { BrowserRouter } from 'react-router-dom'

const mockMovie = {
  id: 1,
  title: 'Test Movie',
  poster_path: '/test-path.jpg',
  overview: 'Test description'
}

describe('MovieCard', () => {
  it('renders movie poster', () => {
    render(
      <BrowserRouter>
        <MovieCard movie={mockMovie} />
      </BrowserRouter>
    )
    
    const image = screen.getByAltText(mockMovie.title)
    expect(image).toBeInTheDocument()
  })
})