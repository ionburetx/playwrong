import { Link } from 'react-router-dom';

const MovieCard = ({ movie, isTrending }) => {
  const imageUrl = `https://image.tmdb.org/t/p/${isTrending ? 'w780' : 'w342'}${movie.poster_path}`;

  return (
    <div className="relative group overflow-hidden rounded-lg">
      <img
        src={imageUrl}
        alt={movie.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-transparent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 mb-2 p-4">
        <h3 className="text-xl font-semibold text-white mb-2">{movie.title}</h3>
        <p className="text-sm text-gray-200 mb-4 line-clamp-3">{movie.overview}</p>
        <Link
          to={`/movie/${movie.id}`}
          className="inline-block px-4 py-2 bg-blue-400 text-white rounded-md 
            hover:bg-[#04385d] transition-colors text-center"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;