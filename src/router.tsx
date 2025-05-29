import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Home from "./pages/Home.tsx";
import Details from "./pages/Details";
import Genre from './pages/Genre';
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import MyProfile from "./pages/MyProfile.tsx";
import Search from './pages/Search';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Details />} />
          <Route path="/genre/:genreId" element={<Genre />} />
          <Route path="/myprofile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
          <Route path="/search" element={<Search />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
