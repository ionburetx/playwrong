import TrendingList from '@/components/TrendingList';
import GenreList from '@/components/GenreList';
import { movies } from '@/data/movies';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 space-y-12">
      <TrendingList />
      
      <div className="space-y-8">
        <GenreList 
          title="Drama" 
          movies={movies.filter(m => m.category === 'Drama')} 
        />
        <GenreList 
          title="Comedia" 
          movies={movies.filter(m => m.category === 'Comedia')} 
        />
        <GenreList 
          title="Ficción" 
          movies={movies.filter(m => m.category === 'Ficción')} 
        />
      </div>
    </div>
  );
};

export default Home;