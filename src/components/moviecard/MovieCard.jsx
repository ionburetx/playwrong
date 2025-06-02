import { Link } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w342${movie.poster_path}`;

  return (
    <div className="relative group">
      <div className="relative overflow-hidden rounded-lg transform transition-transform duration-300 group-hover:scale-105 font-tilt-neon">
        <img
          src={imageUrl}
          alt={movie.title}
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 p-6 text-white">
            <h3 className="text-lg font-semibold mb-2">{movie.title}</h3>
            <p className="text-sm mb-3 line-clamp-3">{movie.overview}</p>
            <Link
              to={`/movie/${movie.id}`}
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Ver más
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;