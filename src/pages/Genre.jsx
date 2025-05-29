import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieCard from '../components/moviecard/MovieCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { useMovieStore } from '../store/moviesStore';

const Genre = () => {
  const { genreId } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { 
    fetchMoviesByGenre, 
    getMoviesFromCache,
    getGenreName,
    genres,
    fetchGenres
  } = useMovieStore();

  useEffect(() => {
    const loadContent = async () => {
      if (!genreId) {
        setError('Invalid genre ID');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null); // Reset error state on new load
        
        // Fetch genres if needed
        if (genres.length === 0) {
          await fetchGenres();
        }

        // Validate genre exists
        const genreName = getGenreName(genreId);
        if (!genreName) {
          setError(`Genre with ID ${genreId} not found`);
          setLoading(false);
          return;
        }

        // Check if we need to fetch movies
        const cachedMovies = getMoviesFromCache(genreId);
        if (!cachedMovies?.length) {
          await fetchMoviesByGenre(genreId);
        }
      } catch (err) {
        setError(err.message || 'Failed to load genre content');
        console.error('Error loading genre content:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [genreId, fetchMoviesByGenre, getMoviesFromCache, fetchGenres, genres.length, getGenreName]);

  const movies = getMoviesFromCache(genreId) || [];
  const genreName = genres.length > 0 ? getGenreName(genreId) : '';

  if (loading && (!movies.length || !genres.length)) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} />;
  }

  if (!movies.length) {
    return <Error message={`No movies found for ${genreName}`} />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-white">{genreName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Genre;