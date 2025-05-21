import { Link } from 'react-router-dom';

const MovieCard = ({ movie, isTrending }) => {
  const imageUrl = `https://image.tmdb.org/t/p/${isTrending ? 'w780' : 'w342'}${movie.poster_path}`;

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${isTrending ? 'flex' : ''}`}>
      <img
        src={imageUrl}
        alt={movie.title}
        className={isTrending ? 'w-1/3 object-cover' : 'w-full'}
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{movie.title}</h3>
        {isTrending && (
          <p className="mt-2 text-gray-600">{movie.overview}</p>
        )}
        <Link
          to={`/movie/${movie.id}`}
          className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MovieCard;