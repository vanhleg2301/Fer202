import "./App.css";
import Directors from "./components/Directors/directors";
import Home from "./components/Home/home";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Producers from "./components/Producers/producers";
import Star from "./components/Star/star";
import Movie from "./components/Movie/movie";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/director" element={<Directors />} />
        <Route path="/producer" element={<Producers />} />
        <Route path="/star" element={<Star />} />
        <Route path="/movie" element={<Movie />} />
      </Routes>
    </Router>
  );
}

export default App;
