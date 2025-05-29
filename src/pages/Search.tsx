import { useState, useEffect, FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieCard from '../components/moviecard/MovieCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import api from '../services/api';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  overview: string;
}

const Search: FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchMovies = async () => {
      if (!query) return;
      
      try {
        setLoading(true);
        const response = await api.get(`/search/movie?query=${encodeURIComponent(query)}`);
        setMovies(response.data.results);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [query]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Resultados para: {query}</h1>
        {movies.length === 0 ? (
          <p className="text-gray-600">No se encontraron películas para tu búsqueda.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
