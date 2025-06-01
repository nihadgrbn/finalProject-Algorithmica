import { useState, useEffect } from "react";
import PlanetCard from "../../components/PlanetCard";
import styles from "./Home.module.css";

const Home = () => {
  const [planets, setPlanets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("semimajorAxis"); 
  const [sortOrder, setSortOrder] = useState("asc"); 

  useEffect(() => {
    fetch("https://api.le-systeme-solaire.net/rest/bodies/")
      .then((response) => response.json())
      .then((data) => {
        const onlyPlanets = data.bodies.filter((body) => body.isPlanet);
        setPlanets(onlyPlanets);
      })
      .catch((err) => console.error("error:", err));
  }, []);

  const filteredPlanets = planets
    .filter((planet) =>
      planet.englishName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const valueA = parseFloat(a[sortCriteria]) || 0; 
      const valueB = parseFloat(b[sortCriteria]) || 0;

      if (sortOrder === "asc") {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });

  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Explore: Planets of the Solar System</h1>
        <p className={styles.heroSubtitle}>
          Discover fascinating information about the planets in our solar system and search for your favorite!
        </p>
      </div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search for a planet (e.g., Mars, Jupiter)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />
        <div className={styles.sortContainer}>
          <select
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="semimajorAxis">Orbital Radius</option>
            <option value="gravity">Gravity</option>
            <option value="sideralOrbit">Orbital Period</option>
          </select>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
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
