import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
}

interface MovieCardTrendingProps {
  movie: Movie;
  isTrending: boolean;
}

const MovieCardTrending: FC<MovieCardTrendingProps> = ({ movie, isTrending }) => {
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
        <div className="p-4 md:p-8 ml-4 md:ml-10 max-w-2xl">
          <h3 className="md:text-4xl font-bold text-white mb-4 ml-4 md:ml-10 opacity-0 animate-[fadeIn_1s_ease-out_0.5s_forwards]">{movie.title}</h3>
          {isTrending && (
            <p className="text-white text-sm md:text-lg mb-6 ml-4 md:ml-10 mr-4 md:mr-0 opacity-0 animate-[fadeIn_1s_ease-out_0.7s_forwards] line-clamp-4 md:line-clamp-none">{movie.overview}</p>
          )}
          <Link
            to={`/movie/${movie.id}`}
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md 
              hover:bg-blue-700 transition-colors ml-4 md:ml-10 mb-12 opacity-0 animate-[fadeIn_1s_ease-out_0.7s_forwards]"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MovieCardTrending;
