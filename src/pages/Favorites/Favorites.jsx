import { useState, useEffect } from "react";
import PlanetCard from "../../components/PlanetCard";
import styles from "./Favorites.module.css"; 

const Favorites = () => {
  const [planets, setPlanets] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavoriteIds(favorites);

    async function fetchPlanets() {
      try {
        const res = await fetch("https://api.le-systeme-solaire.net/rest/bodies/");
        const data = await res.json();
        const onlyPlanets = data.bodies.filter((body) => body.isPlanet);
        const favPlanets = onlyPlanets.filter((planet) => favorites.includes(planet.id));
        setPlanets(favPlanets);
      } catch (err) {
        console.error("Error loading favorites:", err);
      }
    }
    fetchPlanets();
  }, []);

  const handleRemove = (id) => {
    const updatedFavorites = favoriteIds.filter((favId) => favId !== id);
    setFavoriteIds(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setPlanets(planets.filter(planet => planet.id !== id));
  };

  return (
    <div className={styles.favorites}>
      <h2>Your Favorite Planets</h2>
      {planets.length === 0 ? (
        <p>You haven't added any favorites yet.</p>
      ) : (
        <div className={styles.planetList}>
          {planets.map((planet) => (
            <PlanetCard
              key={planet.id}
              planet={planet}
              onFavoriteChange={handleRemove}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
