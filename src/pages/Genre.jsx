import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMoviesByGenre, getGenres } from '../services/api';
import MovieCard from '../components/moviecard/MovieCard';
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
        // Obtener el nombre del género
        const genres = await getGenres();
        const genre = genres.find(g => g.id === parseInt(genreId));
        setGenreName(genre?.name || 'Género');

        // Obtener las películas del género
        const moviesData = await getMoviesByGenre(genreId);
        setMovies(moviesData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesAndGenre();
  }, [genreId]);

  if (loading) return <Loading />;
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