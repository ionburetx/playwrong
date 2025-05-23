import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Details = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/movie/${id}`);
        setMovie(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
    }
};
fetchMovie();
}, [id]);

if (loading) return <Loading />;
if (error) return <Error message={error} />;
if (!movie) return <Error message="Película no encontrada" />;

console.log(movie.genres);
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="relative h-96">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent">
              <div className="absolute bottom-0 p-8">
                <h1 className="text-4xl font-bold text-white mb-4">{movie.title}</h1>
                <div className="flex items-center gap-4 text-white mb-4">
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                  <span>•</span>
                  <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
                  <span>•</span>
                  <span>{movie.vote_average.toFixed(1)} ★</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Sinopsis</h2>
            <p className="text-gray-600 mb-6">{movie.overview}</p>
            
            {movie.genres && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">Géneros</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map(genre => (
                    <span
                      key={genre.id}
                      className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;