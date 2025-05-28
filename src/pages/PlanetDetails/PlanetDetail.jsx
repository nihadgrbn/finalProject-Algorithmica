import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./PlanetDetail.module.css";

const PlanetDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [planet, setPlanet] = useState(null);

  useEffect(() => {
    fetch(`https://api.le-systeme-solaire.net/rest/bodies/${id}`)
      .then((res) => res.json())
      .then((data) => setPlanet(data))
      .catch((err) => console.error("Detail fetch error:", err));
  }, [id]);

  if (!planet) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        &#8592; Go Back
      </button>
      <div className={styles.headerSection}>
        <h1 className={styles.name}>{planet.englishName}</h1>
        <p className={styles.tagline}>
          {planet.englishName} - {planet.bodyType === "Planet" ? "An intriguing planet in our solar system" : planet.bodyType}
        </p>
      </div>
      <div className={styles.article}>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Overview</h2>
          <p>
            <span className={styles.planetName}>{planet.englishName}</span> is one of the fascinating celestial objects in our solar system.
            Its gravity is <b>{planet.gravity} m/s²</b>, its mean radius is <b>{planet.meanRadius} km</b>, and its orbital period around the Sun is <b>{planet.sideralOrbit} days</b>.
          </p>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Physical Characteristics</h2>
          <ul className={styles.infoList}>
            <li><strong>Gravity:</strong> {planet.gravity} m/s²</li>
            <li><strong>Density:</strong> {planet.density} g/cm³</li>
            <li>
              <strong>Mass:</strong>{" "}
              {planet.mass?.massValue} ×10<sup>{planet.mass?.massExponent}</sup> kg
            </li>
            <li><strong>Radius:</strong> {planet.meanRadius} km</li>
            <li><strong>Equatorial Radius:</strong> {planet.equaRadius} km</li>
            <li><strong>Polar Radius:</strong> {planet.polarRadius} km</li>
            <li><strong>Flattening:</strong> {planet.flattening}</li>
            <li><strong>Axial Tilt:</strong> {planet.axialTilt}°</li>
            <li><strong>Escape Velocity:</strong> {planet.escape} m/s</li>
          </ul>
        </section>
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Orbit and Rotation Data</h2>
          <ul className={styles.infoList}>
            <li><strong>Orbital Period:</strong> {planet.sideralOrbit} days</li>
            <li><strong>Rotation Period:</strong> {planet.sideralRotation} hours</li>
            <li><strong>Semi-Major Axis:</strong> {planet.semimajorAxis} km</li>
            <li><strong>Perihelion:</strong> {planet.perihelion} km</li>
            <li><strong>Aphelion:</strong> {planet.aphelion} km</li>
            <li><strong>Eccentricity:</strong> {planet.eccentricity}</li>
            <li><strong>Inclination:</strong> {planet.inclination}°</li>
          </ul>
        </section>
        {planet.moons && planet.moons.length > 0 && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Moons</h2>
            <ul className={styles.moonList}>
              {planet.moons.map((moon) => (
                <li key={moon.moon}>{moon.moon}</li>
              ))}
            </ul>
          </section>
        )}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Fun Fact</h2>
          <p className={styles.funFact}>
            Did you know? <span className={styles.planetName}>{planet.englishName}</span> is one of the most fascinating objects in our solar system!
            Discover its secrets and unique features.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PlanetDetail;
