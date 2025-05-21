import { BrowserRouter as Router } from 'react-router-dom';
import TrendingList from './components/TrendingList';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <main>
          <TrendingList />
        </main>
      </div>
    </Router>
  );
}

export default App;
