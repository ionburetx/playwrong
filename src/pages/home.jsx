import { useState, useEffect } from 'react'
import TrendingList from '../components/TrendingList'
import MovieCard from '../components/MovieCard'
import { getMoviesByGenre } from '../services/api'
import Loading from '../components/Loading'
import Error from '../components/Error'

const GENRE_IDS = {
  ACTION: '28',
  DRAMA: '18',
  COMEDY: '35'
}

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [moviesData, setMoviesData] = useState({
    action: [],
    drama: [],
    comedy: []
  })

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const [actionMovies, dramaMovies, comedyMovies] = await Promise.all([
          getMoviesByGenre(GENRE_IDS.ACTION),
          getMoviesByGenre(GENRE_IDS.DRAMA),
          getMoviesByGenre(GENRE_IDS.COMEDY)
        ])

        setMoviesData({
          action: actionMovies,
          drama: dramaMovies,
          comedy: comedyMovies
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchMovies()
  }, [])

  if (loading) {
    return <div data-testid="loading-state"><Loading /></div>
  }

  if (error) {
    return <div data-testid="error-state"><Error message={error} /></div>
  }

  return (
    <div data-testid="home-page" className="min-h-screen bg-gray-100">
      <TrendingList />
      
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* ...resto del código existente... */}
      </div>
    </div>
  )
}

export default Home