import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./PlanetCard.module.css";
import planetImages from "../assets/planetImages";

const PlanetCard = ({ planet }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.includes(planet.id));
  }, [planet.id]);

  const toggleFavorite = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(planet.id)) {
      favorites = favorites.filter((id) => id !== planet.id);
    } else {
      favorites.push(planet.id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  const imageKey = planet.englishName?.toLowerCase?.() || "earth";
  const imageSrc = planetImages[imageKey] || planetImages["earth"];

  return (
    <div className={styles.planetCard}>
      <img
        src={imageSrc}
        alt={planet.englishName}
        className={styles.planetImage}
        loading="lazy"
      />
      <div className={styles.planetHeader}>
        <span className={styles.planetEmoji}></span>
        <h3 className={styles.planetName}>{planet.englishName}</h3>
      </div>
      <div className={styles.planetInfo}>
        <div>
          <b>Radius:</b> {planet.meanRadius} km
        </div>
        <div>
          <b>Orbital Period:</b> {planet.sideralOrbit} days
        </div>
        <div>
          <b>Gravity:</b> {planet.gravity} m/s²
        </div>
      </div>
      <Link to={`/planet/${planet.id}`} className={styles.detailsLink}>
        View Details →
      </Link>
      <button onClick={toggleFavorite} className={styles.favoriteBtn}>
        {isFavorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
      </button>
    </div>
  );
};

export default PlanetCard;
