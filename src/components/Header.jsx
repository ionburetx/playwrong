import { Link, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import logo from '../assets/logo.png';
import SearchBar from './SearchBar';

export default function Header() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  const handleSearch = (query) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="bg-blue-400 text-white px-8 py-3 flex items-center justify-between">
      {/* Logo y Barra de búsqueda */}
      <div className="flex items-center space-x-8 flex-1">
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-12" />
        </Link>
        
        <div className="max-w-xl w-full">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Navegación y Autenticación */}
      <div className="flex items-center space-x-8">
        <nav className="hidden md:flex space-x-8 text-lg">
          <Link to="/genre/18" className="text-white hover:text-gray-200 active:text-black transition-colors">Drama</Link>
          <Link to="/genre/35" className="text-white hover:text-gray-200 active:text-black transition-colors">Comedia</Link>
          <Link to="/genre/878" className="text-white hover:text-gray-200 active:text-black transition-colors">Ficción</Link>
        </nav>

        <div className="flex items-center space-x-4">
          {isAuthenticated && (
            <div className="flex items-center space-x-3">
              <img 
                src={user.picture} 
                alt={user.name} 
                className="w-8 h-8 rounded-full"
              />
              <span className="hidden md:inline">Hola, {user.name}</span>
              <Link to="/myprofile">Mi Perfil</Link>
            </div>
          )}
          
          <button 
            onClick={() => isAuthenticated 
              ? logout({ returnTo: window.location.origin }) 
              : loginWithRedirect()
            }
            className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-lg font-semibold transition"
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </header>
  );
}