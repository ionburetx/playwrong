import { useState, useEffect, useCallback, FC } from 'react';
import TrendingList from '../components/TrendingList';
import MovieCard from '../components/moviecard/MovieCard.jsx';
import Loading from '../components/Loading.tsx';
import Error from '../components/Error.tsx';
import { useMovieStore } from '../store/moviesStore';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
}

interface ErrorWithMessage {
  message: string;
}

const isErrorWithMessage = (error: unknown): error is ErrorWithMessage => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
};

const Home: FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { fetchMoviesByGenre, getMoviesFromCache } = useMovieStore();

  // Memoize the loadMovies function
  const loadMovies = useCallback(async (): Promise<void> => {
    // If we're already loading, don't start another load
    if (!loading) return;

    try {
      const genres: string[] = ['18', '35', '878'];
      const fetchNeeded = genres.some(genreId => {
        const cached = getMoviesFromCache(genreId);
        return !cached?.length;
      });

      // Only proceed if we actually need to fetch
      if (fetchNeeded) {
        // Check cache first for each genre
        const dramaCache = getMoviesFromCache('18');
        const comedyCache = getMoviesFromCache('35');
        const fictionCache = getMoviesFromCache('878');

        // Create an array of promises only for genres that need fetching
        const fetchPromises: Promise<void>[] = [];
        
        if (!dramaCache?.length) {
          fetchPromises.push(fetchMoviesByGenre('18'));
        }
        if (!comedyCache?.length) {
          fetchPromises.push(fetchMoviesByGenre('35'));
        }
        if (!fictionCache?.length) {
          fetchPromises.push(fetchMoviesByGenre('878'));
        }

        // Only fetch if we need to
        if (fetchPromises.length > 0) {
          await Promise.all(fetchPromises);
        }
      }
    } catch (error: unknown) {
      let errorMessage: string;
      if (isErrorWithMessage(error)) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else {
        errorMessage = 'An unknown error occurred';
      }
      setError(errorMessage);
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  }, [fetchMoviesByGenre, getMoviesFromCache, loading]);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  // Get movies from cache
  const dramaMovies: Movie[] = getMoviesFromCache('18')?.slice(0, 8) || [];
  const comedyMovies: Movie[] = getMoviesFromCache('35')?.slice(0, 8) || [];
  const fictionMovies: Movie[] = getMoviesFromCache('878')?.slice(0, 8) || [];

  if (loading && (!dramaMovies.length || !comedyMovies.length || !fictionMovies.length)) {
    return <Loading />;
  }
  if (error) return <Error message={error} />;

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