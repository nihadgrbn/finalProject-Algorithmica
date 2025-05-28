import { useState, useEffect } from "react";
import styles from "./NasaApod.module.css";

const NasaApod = () => {
  const [photoData, setPhotoData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    const fetchApodData = async () => {
      const today = new Date().toISOString().slice(0, 10); 
      const cacheKey = `apodData_${today}`;
      const cachedData = localStorage.getItem(cacheKey);

      if (cachedData) {
        setPhotoData(JSON.parse(cachedData));
        setLoading(false);
      } else {
        try {
          const response = await fetch(
            `https://api.nasa.gov/planetary/apod?api_key=${import.meta.env.VITE_NASA_API_KEY}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data from NASA API");
          }
          const data = await response.json();
          localStorage.setItem(cacheKey, JSON.stringify(data));
          setPhotoData(data);
          setLoading(false);
        } catch (error) {
          console.error("NASA APOD error:", error);
          setLoading(false);
        }
      }
    };

    fetchApodData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!photoData) return <p>No data available.</p>;

  function formatDate(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  return (
    <div className={styles.apodContainer}>
      {photoData.date && (
        <div className={styles.apodDate}>
          <span>Date:</span>
          <span className={styles.apodDateValue}>{formatDate(photoData.date)}</span>
        </div>
      )}
      <h1>{photoData.title}</h1>

      {photoData.media_type === "image" && photoData.url ? (
        <>
          <img
            src={photoData.hdurl || photoData.url}
            alt={photoData.title}
            className={styles.apodImage}
            onClick={() => setIsImageModalOpen(true)}
          />
          {isImageModalOpen && (
            <div className={styles.imageModal} onClick={() => setIsImageModalOpen(false)}>
              <img
                src={photoData.hdurl || photoData.url}
                alt={photoData.title}
                className={styles.modalImage}
              />
            </div>
          )}
        </>
      ) : photoData.media_type === "video" && photoData.url ? (
        <video controls className={styles.apodVideo}>
          <source src={photoData.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <p>Media type not supported or no valid URL available.</p>
      )}

      <p>{photoData.explanation}</p>
    </div>
  );
};

export default NasaApod;
