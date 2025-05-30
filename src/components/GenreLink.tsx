import { FC } from 'react';
import { Link } from 'react-router-dom';

interface GenreLinkProps {
  genreId: string;
  text: string;
  onClick?: () => void;
}

const GenreLink: FC<GenreLinkProps> = ({ genreId, text, onClick }) => {
  return (
    <Link 
      to={`/genre/${genreId}`} 
      className="hover:text-gray-200 transition-colors font-tilt-neon"
      onClick={onClick}
    >
      {text}
    </Link>
  );
};

export default GenreLink; 