import { useEffect } from 'react';
import TrendingList from '../components/TrendingList';
import MovieCard from '../components/moviecard/MovieCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { useMovieStore } from '../store/moviesStore';

const Home = () => {
  const { 
    moviesByGenre,
    loading,
    error,
    fetchMoviesByGenre
  } = useMovieStore();

  useEffect(() => {
    const fetchAllGenres = async () => {
      try {
        // Fetch movies for each genre (28=Action, 18=Drama, 35=Comedy)
        await Promise.all([
          fetchMoviesByGenre('28'),
          fetchMoviesByGenre('18'),
          fetchMoviesByGenre('35')
        ]);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchAllGenres();
  }, [fetchMoviesByGenre]);

  if (loading && Object.keys(moviesByGenre).length === 0) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="min-h-screen bg-gray-100">
      <TrendingList />
      
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Sección de Acción */}
        <section className="movie-section">
          <h2 className="text-3xl font-bold mb-6">Acción</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {moviesByGenre['28']?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Sección de Drama */}
        <section className="movie-section">
          <h2 className="text-3xl font-bold mb-6">Drama</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {moviesByGenre['18']?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Sección de Comedia */}
        <section className="movie-section">
          <h2 className="text-3xl font-bold mb-6">Comedia</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {moviesByGenre['35']?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;