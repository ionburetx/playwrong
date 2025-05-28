import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Loading from '../components/Loading';
import Error from '../components/Error';
import { FaPlay, FaPause, FaTimes, FaUser } from 'react-icons/fa';
import { useMovieStore } from '../store/moviesStore';



const Details = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoKey, setVideoKey] = useState(null);
  const playerRef = useRef(null);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleClose = () => {
    navigate(-1);
  };
  //const [movie, setMovie] = useState(null);
  const [genreNames, setGenreNames] = useState([]);
  
  const { 
    fetchMovieDetails,
    fetchGenres,
    getMovieGenreNames,
    genres
  } = useMovieStore();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMovieAndCredits = async () => {
      try {
        setLoading(true);
        const [movieResponse, creditsResponse, videosResponse] = await Promise.all([
          api.get(`/movie/${id}`),
          api.get(`/movie/${id}/credits`),
          api.get(`/movie/${id}/videos`)
        ]);
        
        setMovie(movieResponse.data);
        setCredits(creditsResponse.data);

        const trailer = videosResponse.data.results.find(
          video => video.type === "Trailer" && video.site === "YouTube"
        ) || videosResponse.data.results[0];
        
        if (trailer) {
          setVideoKey(trailer.key);
        }
      } catch (err) {
        setError(err.message);
        console.error('Error loading movie details:', err);
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
  
  const getProfileImage = (profilePath, size = "normal") => {
    if (!profilePath) {
      return (
        <div className={`${size === "small" ? "w-16 h-16" : "w-32 h-32"} rounded-full bg-gray-700 flex items-center justify-center`}>
          <FaUser className={`${size === "small" ? "w-8 h-8" : "w-16 h-16"} text-gray-400`} />
        </div>
      );
    }

    return (
      <img
        src={`https://image.tmdb.org/t/p/w200${profilePath}`}
        alt="Profile"
        className={`${size === "small" ? "w-16 h-16" : "w-32 h-32"} rounded-full object-cover`}
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="relative min-h-screen">
        {/* Background Image/Video */}
        {isPlaying && videoKey ? (
          <div className="absolute inset-0 w-full h-full z-10 bg-black">
            <iframe
              ref={playerRef}
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&mute=0&controls=1&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&enablejsapi=1&playsinline=1`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              frameBorder="0"
              className="absolute top-1/2 left-1/2 w-[100vw] h-[100vh] -translate-x-1/2 -translate-y-1/2"
              style={{
                aspectRatio: '16/9',
                minWidth: '100%',
                minHeight: '100%',
                objectFit: 'cover'
              }}
              title="Movie Trailer"
            />
          </div>
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            className="w-full h-full absolute object-cover"
          />
        )}

        <div className={`absolute inset-0 bg-black/60 ${isPlaying ? 'bg-opacity-30' : ''}`} />
        <div className={`absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent ${isPlaying ? 'opacity-30' : ''}`} />


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
            isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
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
                    {getProfileImage(director.profile_path, "small")}
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
                  {getProfileImage(actor.profile_path)}
                  <p className="font-medium mt-2">{actor.name}</p>
                  <p className="text-sm text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Play/Pause Button */}
        <div className="fixed right-8 bottom-8 z-20">
          <button 
            className="bg-blue-400 hover:bg-[#04385d] transition-all duration-700 w-16 h-16 rounded-full flex items-center justify-center text-2xl"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <FaPause className="ml-0"/>
            ) : (
              <FaPlay className="ml-1"/>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;