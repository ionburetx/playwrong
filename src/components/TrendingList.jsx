import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import Loading from './Loading.jsx';
import Error from './Error';

const TrendingList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        setMovies(response.data.results.slice(0, 3));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Trending Today</h2>
      <div className="grid grid-cols-1 gap-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isTrending={true}
          />
        ))}
      </div>
    </section>
  );
};

export default TrendingList;