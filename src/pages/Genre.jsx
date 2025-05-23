import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesByGenre, getGenres } from '../services/api';
import MovieCard from '../components/MovieCard';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Genre = () => {
  const { genreId } = useParams();
  const [movies, setMovies] = useState([]);
  const [genreName, setGenreName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoviesAndGenre = async () => {
      try {
        setLoading(true);
        setError(null); // Reset error state on new fetch

        // Obtener el nombre del género
        const genres = await getGenres();
        const genre = genres.find(g => g.id === parseInt(genreId));
        
        if (!genre) {
          throw new Error('Género no encontrado');
        }
        
        setGenreName(genre.name);

        // Obtener las películas del género
        const moviesData = await getMoviesByGenre(genreId);
        
        if (!moviesData || moviesData.length === 0) {
          throw new Error('No se encontraron películas para este género');
        }

        setMovies(moviesData);
      } catch (err) {
        setError(err.message);
        setMovies([]); // Reset movies on error
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesAndGenre();
  }, [genreId]);

  if (loading) {
    return (
      <div data-testid="loading-state" className="flex justify-center items-center min-h-screen">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div data-testid="error-state" className="flex justify-center items-center min-h-screen">
        <Error message={error} />
      </div>
    );
  }

  return (
    <div data-testid="genre-page" className="max-w-7xl mx-auto px-4 py-8">
      <h1 
        data-testid="genre-title" 
        className="text-4xl font-bold mb-8"
      >
        {genreName}
      </h1>
      <div 
        data-testid="movies-grid"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {movies.map((movie) => (
          <div 
            key={movie.id}
            data-testid={`movie-card-${movie.id}`}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>
      {movies.length === 0 && (
        <p 
          data-testid="no-movies-message"
          className="text-center text-gray-500 mt-8"
        >
          No hay películas disponibles para este género
        </p>
      )}
    </div>
  );
};

export default Genre;