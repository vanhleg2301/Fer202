import "./App.css";
import Directors from "./components/Directors/directors";
import Home from "./components/Home/home";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Producers from "./components/Producers/producers";
import Star from "./components/Star/star";
import Movie from "./components/Movie/movie";
import Detail from "./components/Movie/detail";
import Create from "./components/Movie/create";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/director" element={<Directors />} />
        <Route path="/producer" element={<Producers />} />
        <Route path="/star" element={<Star />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/movie/add" element={<Create />} />
        <Route path="/movie/:id" element={<Detail />} />
      </Routes>
    </Router>
  );
}

export default App;
