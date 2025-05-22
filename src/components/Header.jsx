import { Link } from "react-router-dom";
import logo from '../assets/logo.png';


export default function Header() {
  return (
    <header className="bg-blue-400 text-white px-6 py-4 flex items-center">
  {/* Logo */}
  <div className="text-2xl font-bold">
    <Link to="/">
      <img src={logo} alt="Logo" className="h-10" />
    </Link>
  </div>

  {/* Navbar + Login juntos */}
  <div className="ml-auto flex items-center gap-6">
    {/* Navbar */}
    <nav className="hidden md:flex space-x-6 text-lg text-white">
      <Link to="/genre/18" className="text-white hover:text-gray-200 active:text-black transition-colors">Drama</Link>
      <Link to="/genre/35" className="text-white hover:text-gray-200 active:text-black transition-colors">Comedia</Link>
      <Link to="/genre/878" className="text-white hover:text-gray-200 active:text-black transition-colors">Ficción</Link>
    </nav>

    {/* Botón de Login */}
    <button className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-lg font-semibold transition">
      Login
    </button>
  </div>
</header>

  );
}