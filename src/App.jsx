import { Outlet } from 'react-router-dom';
import Header from './components/Header';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
