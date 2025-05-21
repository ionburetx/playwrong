import { Link } from "react-router-dom";
import logo from '../assets/logo.png';


export default function Header() {
  return (
    <header className="bg-blue-400 text-white px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/">
            <img src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>
      </div>

      {/* Navbar central */}
      <nav className="flex space-x-6 text-lg">
        <Link to="/genre/18" className="hover:text-white/80 transition">Drama</Link>
        <Link to="/genre/35" className="hover:text-white/80 transition">Comedia</Link>
        <Link to="/genre/878" className="hover:text-white/80 transition">Ficción</Link>
      </nav>

      {/* Botón de Login */}
      <div>
        <button className="bg-white text-black px-4 py-2 rounded-md font-semibold transition hover:bg-gray-200">
          Login
        </button>
      </div>
    </header>
  );
}