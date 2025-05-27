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
  const [genreName, setGenreName] = useState('');
  
  const { 
    fetchMoviesByGenre, 
    getMoviesFromCache,
    getGenreName,
    genres,
    fetchGenres
  } = useMovieStore();

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        
        // First fetch genres if we don't have them
        if (genres.length === 0) {
          await fetchGenres();
        }
        
        // Set genre name after genres are loaded
        setGenreName(getGenreName(genreId));

        // Check if we need to fetch movies
        const cachedMovies = getMoviesFromCache(genreId);
        if (!cachedMovies?.length) {
          await fetchMoviesByGenre(genreId);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error loading genre content:', err);
      } finally {
        setLoading(false);
      }
    };

    loadContent();
  }, [genreId, fetchMoviesByGenre, getMoviesFromCache, fetchGenres, genres.length, getGenreName]);

  // Update genre name when genres or genreId changes
  useEffect(() => {
    if (genres.length > 0) {
      setGenreName(getGenreName(genreId));
    }
  }, [genres, genreId, getGenreName]);

  // Get movies from cache
  const movies = getMoviesFromCache(genreId) || [];

  if (loading && (!movies.length || !genreName)) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{genreName}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Genre;