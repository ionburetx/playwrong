import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import TrendingList from '../components/TrendingList'
import { BrowserRouter } from 'react-router-dom'

// Mock the API call
vi.mock('../services/api', () => ({
  getTrendingMovies: () => Promise.resolve([
    {
      id: 1,
      title: 'Fountain of Youth',
      backdrop_path: '/test1.jpg',
      overview: 'Test description 1'
    },
    {
      id: 2,
      title: 'Until Dawn',
      backdrop_path: '/test2.jpg',
      overview: 'Test description 2'
    }
  ])
}))

describe('TrendingList', () => {
  it('muestra el título TRENDING', async () => {
    render(
      <BrowserRouter>
        <TrendingList />
      </BrowserRouter>
    )
    
    await waitFor(() => {
      expect(screen.getByText('TRENDING')).toBeInTheDocument()
    })
  })

  it('muestra las películas trending', async () => {
    render(
      <BrowserRouter>
        <TrendingList />
      </BrowserRouter>
    )
    
    await waitFor(() => {
      expect(screen.getByText('Fountain of Youth')).toBeInTheDocument()
      expect(screen.getByText('Until Dawn')).toBeInTheDocument()
    })
  })
})