import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getMovieById } from '../services/api'
import Loading from '../components/Loading'
import Error from '../components/Error'

const Details = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    const fetchMovie = async () => {
      try {
        setLoading(true)
        setError(null)
        const movieData = await getMovieById(id)
        
        if (isMounted) {
          setMovie(movieData)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message)
          setLoading(false)
        }
      }
    }

    fetchMovie()

    return () => {
      isMounted = false
    }
  }, [id])

  if (loading) {
    return <div data-testid="loading-state"><Loading /></div>
  }

  if (error) {
    return <div data-testid="error-state"><Error message={error} /></div>
  }

  if (!movie) {
    return <div data-testid="no-movie">No se encontró la película</div>
  }

  return (
    <div data-testid="movie-details" className="max-w-7xl mx-auto px-4 py-8">
      <h1 data-testid="movie-title" className="text-4xl font-bold mb-4">
        {movie.title}
      </h1>
      <p data-testid="movie-overview" className="text-lg mb-4">
        {movie.overview}
      </p>
      <div className="flex gap-4 mb-4">
        <span data-testid="movie-runtime">{movie.runtime} minutes</span>
        <span data-testid="movie-rating">{movie.vote_average}/10</span>
      </div>
      <button 
        data-testid="play-button"
        className="bg-blue-600 text-white px-6 py-2 rounded"
        type="button"
      >
        Reproducir
      </button>
    </div>
  )
}

export default Details