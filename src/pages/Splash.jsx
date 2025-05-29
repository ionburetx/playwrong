import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Autoplay } from 'swiper/modules';
import api from '../services/api';
import groupLogo from '../assets/Group.png';
import 'swiper/css';
import 'swiper/css/effect-fade';

const Splash = () => {
  const navigate = useNavigate();
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [movies, setMovies] = useState([]);
  const [showMovies, setShowMovies] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get('/movie/popular');
        setMovies(response.data.results.slice(0, 8));
        // Mostramos las películas después de un pequeño delay
        setTimeout(() => setShowMovies(true), 100);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();

    const overlayTimer = setTimeout(() => setIsOverlayActive(true), 4000);
    const navigationTimer = setTimeout(() => {
      navigate('/home');
    }, 5000);

    return () => {
      clearTimeout(overlayTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      {showMovies && movies.length > 0 && (
        <Swiper
          modules={[EffectFade, Autoplay]}
          effect="fade"
          autoplay={{
            delay: 150,
            disableOnInteraction: false,
          }}
          speed={20}
          loop={true}
          className="w-full h-full"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="relative w-full h-full">
                <img 
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="absolute inset-0 flex items-center justify-center z-10">
        <img 
          src={groupLogo} 
          alt="PlayWrong Logo"
          className="w-96 h-96 object-contain animate-grow"
        />
      </div>

      <div className={`absolute inset-0 bg-black transition-opacity duration-1000 ease-in-out z-20
        ${isOverlayActive ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};