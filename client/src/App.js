import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import VideogameDetail from "./components/VideogameDetail/VideogameDetail";
import NewVideogame from "./components/NewVideogame/NewVideogame";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/videogame" element={<NewVideogame />} />
        <Route path="/videogame/:id" element={<VideogameDetail />} />
      </Routes>
    </div>
  );
}

export default App;
