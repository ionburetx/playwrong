import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Home from "./pages/home";
import Details from "./pages/Details";
import Genre from './pages/Genre';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Details />} />
          <Route path="/genre/:genreId" element={<Genre />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
