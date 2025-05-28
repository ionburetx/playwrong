import { useState, useEffect, FC } from 'react';
import { useParams, Params } from 'react-router-dom';
import MovieCard from '../components/moviecard/MovieCard';
import Loading from '../components/Loading';
import Error from '../components/Error';
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

const Genre: FC = () => {
  const { genreId } = useParams<'genreId'>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
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
  }, [genreId, fetchMoviesByGenre, getMoviesFromCache, fetchGenres, genres.length]);

  // Get movies from cache and genre name
  const movies: Movie[] = getMoviesFromCache(genreId) || [];
  const genreName: string = genres.length > 0 ? getGenreName(genreId) : '';

  if (loading && (!movies.length || !genres.length)) return <Loading />;
  if (error) return <Error message={error} />;
  if (!genreName) return <Error message="Genre not found" />;

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