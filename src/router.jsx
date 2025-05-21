import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import MovieDetail from "./pages/MovieDetail"
import Genre from './pages/Genre';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/genre/:genreId" element={<Genre />} />
      </Routes>
    </BrowserRouter>
  )
}