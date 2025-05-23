import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { FaPlay } from 'react-icons/fa';

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
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative h-[100vh]">
            <img
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
          className="w-full h-full object-cover"
        />
          <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />

        <div className="absolute top-16 left-8 z-10 max-w-[60%] space-y-6">
          <div>
            <h1 className="text-5xl font-bold mb-2">{movie.title}</h1>
            <p className="text-lg">{movie.overview}</p>
            <button 
              className="fixed bottom-8 right-8 z-20 bg-blue-400 hover:bg-[#04385d] transition-colors w-16 h-16 rounded-full flex items-center justify-center text-2xl"
              onClick={() => alert('Play functionality coming soon!')}
            >
              <FaPlay className="ml-1"/>

            </button>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Details</h2>
            <p><span className="font-bold">Release Date:</span> {movie.release_date}</p>
            <p><span className="font-bold">Rating:</span> {movie.vote_average}/10</p>
            <p><span className="font-bold">Runtime:</span> {movie.runtime} minutes</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-2">Genres</h2>
            <div className="flex flex-wrap gap-2">
              {movie.genres && movie.genres.map(genre => (
                <span 
                  key={genre.id}
                  className="px-3 py-1 bg-blue-600 rounded-full text-sm"
                >
                  {genre.name}
                </span>

              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default Details;