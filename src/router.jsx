import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Home from "./pages/home";
import Details from "./pages/Details";
import Genre from './pages/Genre';
import ProtectedRoute from "./components/ProtectedRoute";
import MyProfile from "./pages/MyProfile";
import Admin from "./pages/Admin";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Details />} />
          <Route path="/genre/:genreId" element={<Genre />} />
          <Route path="/myprofile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
          {/* <ProtectedRoute>
            <Route path="/myprofile" element={<MyProfile />} />
            <Route path="/admin" element={<Admin />} />
          </ProtectedRoute> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
