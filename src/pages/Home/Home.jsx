import { useState, useEffect } from "react";
import PlanetCard from "../../components/PlanetCard";
import styles from "./Home.module.css";

const Home = () => {
  const [planets, setPlanets] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 

  useEffect(() => {
    fetch("https://api.le-systeme-solaire.net/rest/bodies/")
      .then((response) => response.json())
      .then((data) => {
        const onlyPlanets = data.bodies.filter((body) => body.isPlanet);
        setPlanets(onlyPlanets);
      })
      .catch((err) => console.error("error:", err));
  }, []);
  
  const filteredPlanets = planets.filter((planet) =>
    planet.englishName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Explore: Planets of the Solar System</h1>
        <p className={styles.heroSubtitle}>
          Discover fascinating information about the planets in our solar system and search for your favorite!
        </p>
      </div>
      <input
        type="text"
        placeholder="Search for a planet..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.planetList}>
        {filteredPlanets.length > 0 ? (
          filteredPlanets.map((planet) => (
            <PlanetCard key={planet.id} planet={planet} />
          ))
        ) : (
          <p className={styles.notFound}>No planets found matching your search.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
