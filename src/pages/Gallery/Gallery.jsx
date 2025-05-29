import { useState } from "react";
import styles from "./Gallery.module.css";

const Gallery = () => {
  const [gallery, setGallery] = useState(() => {
    const savedGallery = localStorage.getItem("nasaGallery");
    return savedGallery ? JSON.parse(savedGallery) : [];
  });
  const [modalImg, setModalImg] = useState(null);

  const handleDelete = (index) => {
    const updatedGallery = gallery.filter((_, i) => i !== index);
    setGallery(updatedGallery);
    localStorage.setItem("nasaGallery", JSON.stringify(updatedGallery));
  };

  return (
    <div className={styles.galleryContainer}>
      <h2>My NASA Collection</h2>
      {gallery.length === 0 ? (
        <p>Your gallery is empty. Add photos from Mars Rover Photos!</p>
      ) : (
        <div className={styles.galleryGrid}>
          {gallery.map((item, index) => (
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
