import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import MovieCard from './MovieCard';

// Importa los estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const GenreList = ({ title, movies }) => {
  return (
    <div className="py-4">
      <h2 className="text-2xl font-bold mb-4 px-4">{title}</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={4}
        navigation
        pagination={{ clickable: true }}
        className="mySwiper"
      >
        {movies?.map((movie) => (
          <SwiperSlide key={movie.id}>
            <MovieCard movie={movie} isTrending={false} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GenreList;
