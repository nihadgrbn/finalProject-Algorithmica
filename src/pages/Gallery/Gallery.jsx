import { useState } from "react";
import styles from "./Gallery.module.css";

const Gallery = () => {
  const [gallery, setGallery] = useState(() => {
    try {
      const savedGallery = localStorage.getItem("nasaGallery");
      return savedGallery ? JSON.parse(savedGallery) : [];
    } catch (error) {
      console.error("Error reading from localStorage:", error);
      return [];
    }
  });
  const [modalImg, setModalImg] = useState(null);
  
  const [searchName, setSearchName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); 

  const handleDelete = (index) => {
    try {
      const updatedGallery = gallery.filter((_, i) => i !== index);
      setGallery(updatedGallery);
      localStorage.setItem("nasaGallery", JSON.stringify(updatedGallery));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  };

  const filteredGallery = gallery
    .filter((item) => {
      const matchesName = item.name && item.name.toLowerCase().includes(searchName.toLowerCase());
      const matchesDate =
        (!startDate || new Date(item.dateAdded) >= new Date(startDate)) &&
        (!endDate || new Date(item.dateAdded) <= new Date(endDate));
      return matchesName && matchesDate;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  return (
    <div className={styles.galleryContainer}>
      <h2>My NASA Collection</h2>
      <div className={styles.filterSection}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className={styles.filterInput}
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={styles.filterInput}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className={styles.filterInput}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className={styles.sortSelect}
        >
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
        </select>
      </div>
      {filteredGallery.length === 0 ? (
        <p>No matching results found.</p>
      ) : (
        <div className={styles.galleryGrid}>
          {filteredGallery.map((item, index) => (
            <div key={index} className={styles.galleryCard}>
              <img
                src={item.imgSrc}
                alt={item.name}
                className={styles.galleryImage}
                onClick={() => setModalImg(item.imgSrc)}
              />
              <h3 className={styles.galleryTitle}>{item.name}</h3>
              <p className={styles.galleryDescription}>{item.description}</p>
              <p className={styles.galleryDate}>Added on: {item.dateAdded}</p>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(index)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
      {modalImg && (
        <div className={styles.modal} onClick={() => setModalImg(null)}>
          <img src={modalImg} alt="Enlarged" className={styles.modalImage} />
        </div>
      )}
    </div>
  );
};

export default Gallery;
