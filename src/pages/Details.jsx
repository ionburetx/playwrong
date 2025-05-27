import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { FaPlay, FaTimes } from 'react-icons/fa';

const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMovieAndCredits = async () => {
      try {
        setLoading(true);
        const [movieResponse, creditsResponse] = await Promise.all([
          api.get(`/movie/${id}`),
          api.get(`/movie/${id}/credits`)
        ]);
        
        setMovie(movieResponse.data);
        setCredits(creditsResponse.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieAndCredits();
  }, [id]);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;
  if (!movie) return <Error message="Película no encontrada" />;

  const director = credits?.crew?.find(person => person.job === 'Director');
  const cast = credits?.cast?.slice(0, 10) || [];
  
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative min-h-screen">
        {/* Background Image and Overlay */}
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="w-full h-full absolute object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent" />

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="fixed top-24 right-8 z-50 text-white hover:text-gray-300 transition-colors text-2xl"
        >
          <FaTimes className="w-8 h-8" />
        </button>

        {/* Content */}
        <div 
          className={`relative z-10 container mx-auto px-4 py-8 transform transition-all duration-700 ease-in-out ${
            isPlaying ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
          }`}
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Movie Poster */}
            <div className="flex-shrink-0 w-full md:w-80">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
                className="w-full rounded-lg shadow-2xl"
              />
            </div>

            {/* Movie Details */}
            <div className="flex-grow space-y-8">
              <div>
                <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
                <p className="text-lg text-gray-300">{movie.overview}</p>
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Details</h2>
                <p><span className="font-bold">Release Date:</span> {movie.release_date}</p>
                <p><span className="font-bold">Rating:</span> {movie.vote_average}/10</p>
                <p><span className="font-bold">Runtime:</span> {movie.runtime} minutes</p>

                <div className="flex flex-wrap gap-2">
                  {movie.genres?.map(genre => (
                    <span 
                      key={genre.id}
                      className="px-3 py-1 bg-blue-600 rounded-full text-sm"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Director Section */}
              {director && (
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold">Director</h2>
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${director.profile_path}`}
                      alt={director.name}
                      className="w-16 h-16 rounded-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200?text=No+Image'
                      }}
                    />
                    <span className="text-lg">{director.name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cast Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6">Reparto Principal</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {cast.map(actor => (
                <div key={actor.id} className="flex flex-col items-center text-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                    alt={actor.name}
                    className="w-32 h-32 rounded-full object-cover mb-2"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/200?text=No+Image'
                    }}
                  />
                  <p className="font-medium">{actor.name}</p>
                  <p className="text-sm text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Play Button */}
        <div className="fixed right-8 bottom-8 z-20">
          <button 
          className="bg-blue-400 hover:bg-[#04385d] transition-all duration-700 w-16 h-16 rounded-full flex items-center justify-center text-2xl"
          onClick={() => setIsPlaying(true)}
          >
            <FaPlay className="ml-1"/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;