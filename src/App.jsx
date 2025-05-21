import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import TrendingList from './components/TrendingList';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main>
          <TrendingList />
        </main>
      </div>
    </Router>
  );
}

export default App;
