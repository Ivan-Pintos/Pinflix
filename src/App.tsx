import { Route, Routes, Navigate } from "react-router-dom";

import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import About from "./pages/About";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/movie/:id" element={<Movie />} />
      <Route path="/about" element={<About />} />
      <Route path="/*" element={<Navigate to="/" />} />
    </Routes>
  );
}
