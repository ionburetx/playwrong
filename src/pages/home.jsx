import { useState, useEffect } from 'react';
import TrendingList from '../components/TrendingList';
import MovieCard from '../components/moviecard/MovieCard';
import { getMoviesByGenre } from '../services/api';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Home = () => {
  const [moviesData, setMoviesData] = useState({
    action: [],
    drama: [],
    comedy: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMoviesByGenres = async () => {
      try {
        setLoading(true);
        // Obtener películas para cada género (28=Acción, 18=Drama, 35=Comedia)
        const [actionMovies, dramaMovies, comedyMovies] = await Promise.all([
          getMoviesByGenre('28'),
          getMoviesByGenre('18'),
          getMoviesByGenre('35')
        ]);

        setMoviesData({
          action: actionMovies.slice(0, 9),
          drama: dramaMovies.slice(0, 9),
          comedy: comedyMovies.slice(0, 9)
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMoviesByGenres();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <>
      <TrendingList />
      
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
        {/* Sección de Acción */}
        <section className="movie-section">
          <h2 className="text-3xl font-bold mb-6">Acción</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {moviesData.action.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Sección de Drama */}
        <section className="movie-section">
          <h2 className="text-3xl font-bold mb-6">Drama</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {moviesData.drama.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* Sección de Comedia */}
        <section className="movie-section">
          <h2 className="text-3xl font-bold mb-6">Comedia</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {moviesData.comedy.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;