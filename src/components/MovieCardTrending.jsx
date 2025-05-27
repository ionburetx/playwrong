import { Link } from 'react-router-dom';

const MovieCardTrending = ({ movie, isTrending }) => {
  const imageBaseUrl = "https://image.tmdb.org/t/p/";
  const imageSize = isTrending ? 'original' : 'w342';

  return (
    <div className="relative w-full h-full">
      <img
        src={`${imageBaseUrl}${imageSize}${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex items-center bg-gradient-to-r from-black to-transparent">
        <div className="p-8 ml-10 max-w-2xl">
          <h3 className="text-4xl font-bold text-white mb-4 ml-10 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">{movie.title}</h3>
          {isTrending && (
            <p className="text-white text-lg mb-6 ml-10 opacity-0 animate-[fadeIn_1s_ease-out_0.7s_forwards]">{movie.overview}</p>
          )}
          <Link
            to={`/movie/${movie.id}`}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md 
              hover:bg-blue-700 transition-colors ml-10 mb-12 opacity-0 animate-[fadeIn_1s_ease-out_0.7s_forwards]"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCardTrending;