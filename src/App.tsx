import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Genre from './pages/Genre';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/genre/:genreId" element={<Genre />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;