import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Genre from './pages/Genre';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/genre/:genreId" element={<Genre />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;