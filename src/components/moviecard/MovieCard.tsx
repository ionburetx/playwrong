import { Link } from 'react-router-dom';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
}

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/path-to-fallback-image.jpg'; // Añade una imagen por defecto

  return (
    <div className="relative h-[400px] group overflow-hidden rounded-lg transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl">
      {/* Base image */}
      <img
        src={imageUrl}
        alt={movie.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />

      {/* Overlay content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
        <h3 className="text-white font-bold text-xl mb-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{movie.title}</h3>
        <p className="text-white/90 text-sm mb-4 line-clamp-3 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{movie.overview}</p>
        <Link
          to={`/movie/${movie.id}`}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-all duration-300 text-center transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 delay-100"
        >
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;