import { Link, useNavigate } from "react-router-dom";
import { useAuth0, LogoutOptions } from "@auth0/auth0-react";
import { useState, FC } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from '../assets/logo.png';
import SearchBar from './SearchBar';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

interface User {
  name: string;
  picture: string;
}

const Header: FC = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0<User>();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const handleSearch = (query: string): void => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsMenuOpen(false);
  };

  const handleAuthClick = (): void => {
    setIsMenuOpen(false);
    if (isAuthenticated) {
      logout({ logoutParams: { returnTo: window.location.origin } });
    } else {
      loginWithRedirect();
    }
  };

  return (
    <header className="bg-blue-400 text-white sticky top-0 z-50">
      <div className="px-4 md:px-8 py-3">
        {/* Layout Principal */}
        <div className="flex items-center justify-start md:justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="Logo" className="h-6 md:h-12" />
          </Link>

          {/* Barra de búsqueda - Desktop */}
          <div className="hidden md:block max-w-xl w-full mx-4">
            <SearchBar onSearch={handleSearch} />
          </div>
          {/* Barra de búsqueda - Móvil */}
          {/* <div className="md:hidden mt-2 bg-red-500">
            <SearchBar onSearch={handleSearch} />
          </div> */}

          {/* Botón de menú móvil */}
          <div className="md:hidden flex items-center space-x-4 ml-auto">
              {isAuthenticated && user && (
                <div className="flex items-center space-x-3">
                  <Link to="/myprofile"><img 
                    src={user.picture} 
                    alt={user.name + ' perfil'}
                    title={user.name + ' perfil'}
                    className="w-8 h-8 rounded-full"
                  /></Link>
                </div>
              )}
              <button 
                onClick={handleAuthClick}
                className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-lg font-semibold transition"
              >
                {isAuthenticated ? <FaSignOutAlt className="ml-0.5"/> : <FaSignInAlt className="ml-0.5"/>}
              </button>
            </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-blue-500"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>

          {/* Navegación Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <nav className="flex space-x-8 text-lg">
              <Link to="/genre/18" className="hover:text-gray-200 transition-colors">
                Drama
              </Link>
              <Link to="/genre/35" className="hover:text-gray-200 transition-colors">
                Comedia
              </Link>
              <Link to="/genre/878" className="hover:text-gray-200 transition-colors">
                Ficción
              </Link>
            </nav>

            {/* Sección de Auth - Desktop */}
            <div className="flex items-center space-x-4">
              {isAuthenticated && user && (
                <div className="flex items-center space-x-3">
                  <img 
                    src={user.picture} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden lg:inline">Hola, {user.name}</span>
                  <Link to="/myprofile">Mi Perfil</Link>
                </div>
              )}
              <button 
                onClick={handleAuthClick}
                className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-lg font-semibold transition"
              >
                {isAuthenticated ? 'Logout' : 'Login'}
              </button>
            </div>
          </div>
          
        </div>

        
      </div>

      {/* Menú Móvil */}
      <div 
        className={`md:hidden absolute w-full bg-blue-400 shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        {/* Barra de búsqueda - Móvil */}
        <div className="md:hidden mt-2">
          <SearchBar onSearch={handleSearch} />
        </div>

        <nav className="flex flex-col p-4 space-y-4">
          <Link 
            to="/genre/18" 
            className="hover:text-gray-200 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Drama
          </Link>
          <Link 
            to="/genre/35" 
            className="hover:text-gray-200 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Comedia
          </Link>
          <Link 
            to="/genre/878" 
            className="hover:text-gray-200 py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Ficción
          </Link>

        </nav>
      </div>
    </header>
  );
}

export default Header; 