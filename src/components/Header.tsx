import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth0, LogoutOptions } from "@auth0/auth0-react";
import { useState, FC, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import logo from '../assets/logo.png';
import logonegro from '../assets/logonegro.png';
import SearchBar from './SearchBar';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';

interface User {
  name: string;
  picture: string;
}

const Header: FC = () => {
  const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0<User>();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Añadir efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (query: string): void => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    setIsMenuOpen(false);
  };

  const handleAuthClick = (): void => {
    setIsMenuOpen(false);
    if (isAuthenticated) {
      logout({ logoutParams: { returnTo: window.location.origin + '/home' } });
    } else {
      loginWithRedirect({ appState: { returnTo: '/home' } });
    }
  };

  // Detectar si estamos en la página Genre
  const isGenrePage = location.pathname.startsWith('/genre');

  return (
    <header className="bg-transparent text-white fixed top-0 left-0 w-full z-50">
      {/* Overlay degradado solo si NO es Genre */}
      {!isScrolled && !isGenrePage && (
        <div className="pointer-events-none absolute inset-0 h-full w-full bg-gradient-to-b from-black/70 to-transparent" />
      )}
      <div className="relative px-4 md:px-8 py-3">
        {/* Layout Principal */}
        <div className="flex items-center justify-start md:justify-between">
          {/* Logo */}
          <Link to="/home" className="flex-shrink-0">
            <img src={isGenrePage ? logonegro : logo} alt="Logo" className="h-6 md:h-12" />
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
                className={`bg-transparent md:text-black hover:bg-gray-200 ${isGenrePage ? 'text-black md:text-white' : 'text-white md:text-black'} px-4 py-2 rounded-lg font-semibold transition`}
              >
                {isAuthenticated ? <FaSignOutAlt className="ml-0.5"/> : <FaSignInAlt className="ml-0.5"/>}
              </button>
            </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-lg hover:bg-gray-200 ${isGenrePage ? 'text-black md:text-white' : 'text-white md:text-black'}`}
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
              <Link to="/genre/18" className={`${isGenrePage ? 'text-black' : 'text-white'} hover:text-gray-400 transition-colors`}>
                Drama
              </Link>
              <Link to="/genre/35" className={`${isGenrePage ? 'text-black' : 'text-white'} hover:text-gray-400 transition-colors`}>
                Comedia
              </Link>
              <Link to="/genre/878" className={`${isGenrePage ? 'text-black' : 'text-white'} hover:text-gray-400 transition-colors`}>
                Ficción
              </Link>
            </nav>

            {/* Sección de Auth - Desktop */}
            <div className="flex items-center space-x-4">
              {isAuthenticated && user && (
                <div className="flex items-center space-x-3">
                  <Link to="/myprofile"><img 
                    src={user.picture} 
                    alt={user.name} 
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="hidden">Hola, {user.name}</span>
                  </Link>
                </div>
              )}
              <button 
                onClick={handleAuthClick}
                className={`${isGenrePage ? 'bg-black text-white' : 'bg-white text-black'} hover:bg-gray-200 px-4 py-2 rounded-lg font-semibold transition`}
              >
                {isAuthenticated ? 'Logout' : 'Login'}
              </button>
            </div>
          </div>
          
        </div>

        
      </div>

      {/* Menú Móvil */}
      <div 
        className={`md:hidden absolute w-full  shadow-lg transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        } ${isGenrePage ? 'text-black bg-gradient-to-r from-transparent to-gray-100/70' : 'text-white bg-gradient-to-r from-transparent to-black/70'}`}
      >
        {/* Barra de búsqueda - Móvil */}
        <div className="md:hidden mt-2">
          <SearchBar onSearch={handleSearch} />
        </div>

        <nav className="flex flex-col p-4 space-y-4 text-right">
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