import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import Header from './components/Header';
//import TrendingList from './components/TrendingList';
import Home from './pages/home';
import Details from './pages/Details';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 w-full">
        <Header />
        <main className="w-full">
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<Details />} />
          </Routes>
      
        </main>
      </div>
    </Router>
  );
}

export default App;
