import { Routes, Route } from 'react-router-dom';
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
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/home" element={<Layout><Home /></Layout>} />
    </Routes>
  );
}

export default App;
