import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import MovieCard from './MovieCard';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const GenreList = ({ title, movies }) => {
  return (
    <div className="py-4 relative">
      <h2 className="text-4xl font-bold mb-4 px-4">{title}</h2>
      <div className="[&_.swiper-button-next]:!top-[45%] [&_.swiper-button-prev]:!top-[45%]
                    [&_.swiper-button-next]:!text-white [&_.swiper-button-prev]:!text-white
                    [&_.swiper-button-next]:!bg-black/50 [&_.swiper-button-prev]:!bg-black/50
                    [&_.swiper-button-next]:!p-6 [&_.swiper-button-prev]:!p-6
                    [&_.swiper-button-next]:!rounded-full [&_.swiper-button-prev]:!rounded-full
                    [&_.swiper-button-next]:!after:text-sm [&_.swiper-button-prev]:!after:text-sm
                    [&_.swiper-pagination]:!bottom-2"></div>
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
