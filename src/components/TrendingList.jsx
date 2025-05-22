import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCardTrending from './MovieCardTrending';
import Loading from './Loading.jsx';
import Error from './Error';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const TrendingList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_TMDB_API_KEY}`
        );
        setMovies(response.data.results.slice(0, 3));
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <section className="w-full h-[calc(100vh-72px)] relative overflow-hidden">
      <h1 className="absolute top-8 left-8 text-6xl font-bold text-white z-10 tracking-wider">
        TRENDING
      </h1>
      <Swiper
        modules={[Navigation, EffectFade, Autoplay]}
        effect="fade"
        navigation
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={800}
        loop={true}
        className="w-full h-full"
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCardTrending
              movie={movie}
              isTrending={true}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default TrendingList;