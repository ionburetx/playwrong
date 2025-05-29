import { Routes, Route } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Splash from './pages/Splash';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-100">
    <Header />
    <main className="w-full">
      {children}
    </main>
  </div>
);

function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
