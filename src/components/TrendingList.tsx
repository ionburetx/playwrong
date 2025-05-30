import { useState, useEffect, FC } from 'react';
import { useMovieStore } from '../store/moviesStore';
import MovieCardTrending from './MovieCardTrending';
import Loading from './Loading.tsx';
import Error from './Error.tsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import { useLocation } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

interface Movie {
  id: number;
  title: string;
  backdrop_path: string;
  overview: string;
}

const TrendingList: FC = () => {
  const location = useLocation();
  const { 
    loading, 
    error, 
    fetchTrending, 
    getTrendingFromCache,
    trendingIds
  } = useMovieStore();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [key, setKey] = useState(0); // Add a key to force remount

  // Update key when location changes
  useEffect(() => {
    setKey(prev => prev + 1);
  }, [location]);

  useEffect(() => {
    // If we already have trending movies in cache, use them
    const cachedMovies = getTrendingFromCache();
    if (cachedMovies.length > 0) {
      setMovies(cachedMovies);
      return;
    }

    // Only fetch if we don't have movies in cache
    if (!trendingIds.length) {
      fetchTrending().catch(console.error);
    }
  }, [fetchTrending, getTrendingFromCache, trendingIds]);

  // Update movies when trending cache changes
  useEffect(() => {
    const cachedMovies = getTrendingFromCache();
    if (cachedMovies.length > 0) {
      setMovies(cachedMovies);
    }
  }, [getTrendingFromCache, trendingIds]);

  if (loading && movies.length === 0) return <Loading />;
  if (error) return <Error message={error} />;

  const randomInitialSlide = Math.floor(Math.random() * movies.length);

  return (
    <section className="w-full h-[calc(100vh-72px)] relative overflow-hidden">
      <h1 className="absolute top-8 ml-11 md:ml-20 text-4xl md:text-9xl font-bold text-white/80 z-10 tracking-wider opacity-0.8 -translate-x-full animate-[slideIn_1s_ease-out_forwards]">
        TRENDING
      </h1>
      <Swiper
        key={key} // Force Swiper to remount with new random slide
        modules={[Navigation, EffectFade, Autoplay]}
        effect="fade"
        navigation
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={800}
        loop={true}
        initialSlide={randomInitialSlide}
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
