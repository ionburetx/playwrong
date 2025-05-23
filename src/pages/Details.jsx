import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        setMovie(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>No movie found</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative h-[70vh]">
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-8 -mt-32 relative z-10">
        <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
        <p className="text-lg mb-4">{movie.overview}</p>
        
        <div className="grid grid-cols-2 gap-8 mt-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Details</h2>
            <p><span className="font-bold">Release Date:</span> {movie.release_date}</p>
            <p><span className="font-bold">Rating:</span> {movie.vote_average}/10</p>
            <p><span className="font-bold">Runtime:</span> {movie.runtime} minutes</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {movie.genres && (movie.genres.map(genre => (
                <span 
                  key={genre.id}
                  className="px-3 py-1 bg-blue-600 rounded-full text-sm"
                >
                  {genre.name}
                </span>
              )))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;