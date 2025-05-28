import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Home from "./pages/Home";
import Details from "./pages/Details";
import Genre from './pages/Genre';
import ProtectedRoute from "./components/ProtectedRoute";
import MyProfile from "./pages/MyProfile";
import Search from './pages/Search';
import Splash from './pages/Splash';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route element={<App />}>
          <Route path="/home" element={<Home />} />
          <Route path="/movie/:id" element={<Details />} />
          <Route path="/genre/:genreId" element={<Genre />} />
          <Route path="/myprofile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
