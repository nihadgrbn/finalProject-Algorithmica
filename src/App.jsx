import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Favorites from "./pages/Favorites/Favorites";
import PlanetDetail from "./pages/PlanetDetails/PlanetDetail";
import NasaApod from "./pages/NasaApod/NasaApod";
import MarsPhotos from "./pages/MarsPhotos/MarsPhotos";
import NasaMediaSearch from "./pages/NasaMedia/NasaMediaSearch";
import NearEarthObjects from "./pages/NearEarthObject/NearEarthObjects";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Gallery from "./pages/Gallery/Gallery";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="planet/:id" element={<PlanetDetail />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="nasa-picture" element={<NasaApod />} />
        <Route path="mars-photos" element={<MarsPhotos />} />
        <Route path="nasa-media" element={<NasaMediaSearch />} />
        <Route path="neo" element={<NearEarthObjects />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gallery" element={<Gallery />} />
      </Route>
    </Routes>
  );
}

export default App;
