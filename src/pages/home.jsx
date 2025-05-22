import TrendingList from '../components/TrendingList';
import GenreList from '../components/GenreList';
import popularMovies from '../mocks/populares.json';

const Home = () => {
    const movies = popularMovies;

    
  return (
    <div className="max-w-7xl mx-auto px-4 space-y-12">
      <TrendingList />
      
      <div className="space-y-8">
        <GenreList 
          title="Drama" 
          movies={movies} 
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