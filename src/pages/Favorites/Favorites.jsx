import { useState, useEffect } from "react";
import PlanetCard from "../../components/PlanetCard";
import styles from "./Favorites.module.css"; 
import axios from "axios";

const Favorites = () => {
  const [planets, setPlanets] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteIds(favorites);

    axios
      .get("https://api.le-systeme-solaire.net/rest/bodies/")
      .then((res) => {
        const onlyPlanets = res.data.bodies.filter((body) => body.isPlanet);
        const favPlanets = onlyPlanets.filter((planet) =>
          favorites.includes(planet.id)
        );
        setPlanets(favPlanets);
      })
      .catch((err) => console.error("Error loading favorites:", err));
  }, []);

  return (
    <div className={styles.favorites}>
      <h2>Your Favorite Planets</h2>
      {planets.length === 0 ? (
        <p>You haven't added any favorites yet.</p>
      ) : (
        <div className={styles.planetList}>
          {planets.map((planet) => (
            <PlanetCard key={planet.id} planet={planet} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
