import { useState, useEffect } from "react";
import styles from "./NearEarthObjects.module.css";

const apiKey = import.meta.env.VITE_NASA_API_KEY;

function formatNumber(num) {
  return Number(num).toLocaleString("en-US", { maximumFractionDigits: 2 });
}

const NearEarthObjects = () => {
  const [neos, setNeos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        const allNeos = Object.values(data.near_earth_objects || {}).flat();
        setNeos(allNeos);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [date]);

  return (
    <div className={styles.neoContainer}>
      <h2 className={styles.title}>Near-Earth Asteroids ({date})</h2>
      <div className={styles.dateInputWrapper}>
        <label className={styles.dateLabel}>Select Date:</label>
        <input
          type="date"
          value={date}
          max={new Date().toISOString().slice(0, 10)}
          onChange={e => setDate(e.target.value)}
          className={styles.dateInput}
        />
      </div>
      {loading && <p>Loading...</p>}
      <div className={styles.neoGrid}>
        {neos
          .filter(neo => neo.is_potentially_hazardous_asteroid)
          .map(neo => (
            <div key={neo.id} className={styles.neoCard}>
              <h3 className={styles.neoName}>{neo.name}</h3>
              <ul className={styles.neoInfo}>
                <li>
                  <b>Diameter:</b>{" "}
                  {formatNumber(neo.estimated_diameter.meters.estimated_diameter_min)} -{" "}
                  {formatNumber(neo.estimated_diameter.meters.estimated_diameter_max)} m
                </li>
                <li>
                  <b>Closest Distance:</b>{" "}
                  {formatNumber(neo.close_approach_data[0]?.miss_distance.kilometers)} km
                </li>
                <li>
                  <b>Velocity:</b>{" "}
                  {formatNumber(neo.close_approach_data[0]?.relative_velocity.kilometers_per_hour)} km/h
                </li>
                <li>
                  <b>Orbit:</b> {neo.orbiting_body}
                </li>
              </ul>
              <div className={styles.hazard}>Hazardous!</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NearEarthObjects;
