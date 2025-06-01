import { useState, useEffect, FC } from 'react';
import { useParams, Params } from 'react-router-dom';
import MovieCard from '../components/moviecard/MovieCard';
import Loading from '../components/Loading.tsx';
import Error from '../components/Error.tsx';
import { useMovieStore } from '../store/moviesStore';

interface TMDBMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

// Only require the properties we know we'll use
type Movie = Pick<TMDBMovie, 'id' | 'title' | 'poster_path'> & Partial<TMDBMovie>;

interface GenreRouteParams extends Params {
  genreId: string;
}

interface ErrorWithMessage {
  message: string;
}

function isErrorWithMessage(error: unknown): error is ErrorWithMessage {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as Record<string, unknown>).message === 'string'
  );
}

function getErrorMessage(error: unknown) {
  if (isErrorWithMessage(error)) return error.message;
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unknown error occurred';
}

const Genre: FC = () => {
  const { genreId } = useParams<'genreId'>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  
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
        console.log('Genre component loadContent started', {
          genreId,
          hasGenres: genres.length > 0,
          loading
        });

        setLoading(true);
        setError(null);
        setCurrentPage(1); // Reset page when genre changes
        
        // First ensure genres are loaded
        if (genres.length === 0) {
          console.log('No genres found, fetching them...');
          try {
            await fetchGenres();
            console.log('Genres fetched successfully, current genres:', genres);
          } catch (error: unknown) {
            console.error('Failed to fetch genres:', error);
            throw error;
          }
        }

        // Then fetch movies if needed
        const cachedMovies = getMoviesFromCache(genreId);
        if (!cachedMovies?.length) {
          console.log('No cached movies found for genre, fetching...', genreId);
          await fetchMoviesByGenre(genreId, 1);
        }
      } catch (error: unknown) {
        const errorMsg = getErrorMessage(error);
        console.error('Error in loadContent:', errorMsg);
        setError(errorMsg);
      } finally {
        console.log('loadContent completed', {
          hasGenres: genres.length > 0,
          hasError: error !== null
        });
        setLoading(false);
      }
    };

    loadContent();
  }, [genreId, fetchMoviesByGenre, getMoviesFromCache, fetchGenres, genres.length]);

  const handleLoadMore = async () => {
    if (loadingMore) return;
    
    try {
      setLoadingMore(true);
      const nextPage = currentPage + 1;
      const newMovies = await fetchMoviesByGenre(genreId, nextPage);
      
      // Only increment the page if we got new movies
      if (newMovies.length > 0) {
        setCurrentPage(nextPage);
      } else {
        setError("No more movies available for this genre");
      }
    } catch (error: unknown) {
      const errorMsg = getErrorMessage(error);
      setError(errorMsg);
    } finally {
      setLoadingMore(false);
    }
  };

  // Get movies from cache and genre name
  const movies: Movie[] = getMoviesFromCache(genreId) || [];
  const genreName: string = genres.length > 0 ? getGenreName(genreId) : '';

  console.log('Genre component render state:', {
    loading,
    hasError: error !== null,
    genresLength: genres.length,
    hasGenreName: !!genreName,
    moviesLength: movies.length
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (genres.length === 0) return <Error message="Failed to load genres" />;
  if (!genreName) return <Error message="Genre not found" />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Si tienes imagen de fondo, ponla aquí fuera del mt-24 */}
      <div className="mt-12 md:mt-24">
        <h1 className="text-4xl font-bold mb-8 font-tilt-neon">{genreName}</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        
        {/* Load More Button */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className={`text-white px-6 py-3 rounded-lg font-semibold transition ${
              loadingMore 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loadingMore ? 'Cargando...' : 'Ver más peliculas'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Genre;