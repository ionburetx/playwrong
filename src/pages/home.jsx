import { useState, useEffect } from 'react';
import TrendingList from '../components/TrendingList';
import MovieCard from '../components/moviecard/MovieCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { useMovieStore } from '../store/moviesStore';

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { fetchMoviesByGenre, getMoviesFromCache } = useMovieStore();

  useEffect(() => {
    const fetchMoviesByGenres = async () => {
      try {
        setLoading(true);
        // Fetch movies for Drama (18), Comedy (35), and Fiction (878)
        await Promise.all([
          fetchMoviesByGenre('18'),
          fetchMoviesByGenre('35'),
          fetchMoviesByGenre('878')
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByGenres();
  }, [fetchMoviesByGenre]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  // Get movies from cache
  const dramaMovies = getMoviesFromCache('18')?.slice(0, 8) || [];
  const comedyMovies = getMoviesFromCache('35')?.slice(0, 8) || [];
  const fictionMovies = getMoviesFromCache('878')?.slice(0, 8) || [];

  return (
    <div className="min-h-screen bg-gray-100">
      <TrendingList />
      
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Drama Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Drama</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {dramaMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Comedy Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Comedia</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {comedyMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Fiction Section */}
        <section>
          <h2 className="text-3xl font-bold mb-6">Ficción</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fictionMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;