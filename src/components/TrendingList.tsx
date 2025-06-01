import { useState, useEffect, FC, useRef } from 'react';
import { useMovieStore } from '../store/moviesStore';
import MovieCardTrending from './MovieCardTrending';
import Loading from './Loading.tsx';
import Error from './Error.tsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectFade, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

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
  const { 
    loading, 
    error, 
    fetchTrending, 
    getTrendingFromCache,
    trendingIds
  } = useMovieStore();
  const [movies, setMovies] = useState<Movie[]>([]);
  const swiperRef = useRef<SwiperType | null>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    const initializeMovies = async () => {
      // If we already have trending movies in cache, use them
      const cachedMovies = getTrendingFromCache();
      if (cachedMovies.length > 0) {
        setMovies(cachedMovies);
        return;
      }

      // Only fetch if we don't have movies in cache
      if (!trendingIds.length) {
        await fetchTrending().catch((error: unknown) => {
          console.error('Error fetching trending movies:', error);
        });
      }
    };

    initializeMovies();
  }, [fetchTrending, getTrendingFromCache, trendingIds]);

  // Update movies when trending cache changes
  useEffect(() => {
    const cachedMovies = getTrendingFromCache();
    if (cachedMovies.length > 0) {
      setMovies(cachedMovies);
    }
  }, [getTrendingFromCache, trendingIds]);

  // Initialize swiper with random slide when movies are loaded
  useEffect(() => {
    if (movies.length > 0 && swiperRef.current && !initializedRef.current) {
      const randomIndex = Math.floor(Math.random() * movies.length);
      swiperRef.current.slideTo(randomIndex, 0);
      initializedRef.current = true;
    }
  }, [movies]);

  if (loading && movies.length === 0) return <Loading />;
  if (error) return <Error message={error} />;

  // Only enable loop if we have enough slides
  const shouldEnableLoop = movies.length > 1;

  return (
    <section className="w-full h-screen relative overflow-hidden">
      <h1 className="absolute top-32 ml-11 md:ml-20 text-4xl md:text-9xl font-bold text-white/80 z-10 tracking-wider opacity-0.8 -translate-x-full animate-[slideIn_1s_ease-out_forwards]">
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
        loop={shouldEnableLoop}
        slidesPerView={1}
        slidesPerGroup={1}
        className="w-full h-full"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
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
