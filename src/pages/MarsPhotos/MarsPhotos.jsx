import { useState, useEffect } from "react";
import styles from "./MarsPhotos.module.css";

const apiKey = import.meta.env.VITE_NASA_API_KEY;

function getDateRange(start, end) {
  let arr = [];
  let d = new Date(start);
  let last = new Date(end);
  while (d <= last) {
    arr.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + 1);
  }
  return arr;
}

function MarsPhotos() {
  const [date, setDate] = useState("2020-07-01");
  const [endDate, setEndDate] = useState("");
  const [photos, setPhotos] = useState([]);
  const [modalImg, setModalImg] = useState(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [galleryName, setGalleryName] = useState("");
  const [galleryDescription, setGalleryDescription] = useState("");
  const [galleryError, setGalleryError] = useState("");

  useEffect(() => {
    async function fetchPhotos() {
      let all = [];
      let dates = endDate ? getDateRange(date, endDate) : [date];
      for (let d of dates) {
        let res = await fetch(
          `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=${d}&api_key=${apiKey}`
        );
        let data = await res.json();
        if (data.photos) {
          all = all.concat(data.photos);
        }
      }
      setPhotos(all);
      setVisibleCount(12);
    }
    fetchPhotos();
  }, [date, endDate]);

  function handleShowMore() {
    setVisibleCount(visibleCount + 12);
  }

  function handleModalOpen(imgSrc) {
    setModalImg(imgSrc);
  }

  function handleModalClose() {
    setModalImg(null);
  }

  const handleAddToGallery = () => {
    setGalleryError("");
    if (!galleryName.trim() || !galleryDescription.trim()) {
      setGalleryError("Name and description cannot be empty");
      return;
    }
    if (!modalImg) {
      setGalleryError("No image selected");
      return;
    }

    const savedGallery = JSON.parse(localStorage.getItem("nasaGallery")) || [];
    const isCopy = savedGallery.some(photo => photo.imgSrc === modalImg);
    if (isCopy) {
      setGalleryError("This photo is already in your gallery");
      return;
    }

    const newPhoto = {
      imgSrc: modalImg,
      name: galleryName,
      description: galleryDescription,
      dateAdded: new Date().toISOString().slice(0, 10),
    };
    const updatedGallery = [...savedGallery, newPhoto];

    localStorage.setItem("nasaGallery", JSON.stringify(updatedGallery));
    console.log("Photo added to gallery:", newPhoto);

    setGalleryName("");
    setGalleryDescription("");
    setModalImg(null);
  };

  return (
    <div className={styles.marsPhotosContainer}>
      <h2 className={styles.title}>Mars Rover Photos</h2>
      <div className={styles.dateInputWrapper}>
        <label htmlFor="mars-date" className={styles.dateLabel}>
          Start Date:
        </label>
        <input
          id="mars-date"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className={styles.dateInput}
        />
        <label htmlFor="mars-end-date" className={styles.dateLabel} style={{ marginTop: "0.7rem" }}>
          End Date (optional):
        </label>
        <input
          id="mars-end-date"
          type="date"
          value={endDate}
          min={date}
          onChange={e => setEndDate(e.target.value)}
          className={styles.dateInput}
        />
      </div>
      <div className={styles.photosGrid}>
        {photos.slice(0, visibleCount).map(photo => (
          <div key={photo.id} className={styles.photoCard}>
            <img
              src={photo.img_src}
              alt="Mars"
              className={styles.photoImg}
              style={{ cursor: "zoom-in" }}
              onClick={() => handleModalOpen(photo.img_src)}
            />
            <div className={styles.photoInfo}>
              <h3>{photo.camera.full_name}</h3>
              <p><strong>Rover:</strong> {photo.rover.name}</p>
              <p><strong>Capture Date:</strong> {photo.earth_date}</p>
              <p><strong>Status:</strong> {photo.rover.status}</p>
            </div>
          </div>
        ))}
      </div>
      {visibleCount < photos.length && (
        <button className={styles.button} onClick={handleShowMore}>
          Show More
        </button>
      )}
      {modalImg && (
        <div className={styles.modal} onClick={handleModalClose}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <img src={modalImg} alt="Mars large" className={styles.modalImg} />
            <div className={styles.galleryInputWrapper}>
              {galleryError && <p className={styles.errorText}>{galleryError}</p>}
              <input
                type="text"
                placeholder="Photo Name"
                value={galleryName}
                onChange={(e) => setGalleryName(e.target.value)}
                className={styles.galleryInput}
              />
              <textarea
                placeholder="Photo Description"
                value={galleryDescription}
                onChange={(e) => setGalleryDescription(e.target.value)}
                className={styles.galleryTextarea}
              />
              <button
                className={styles.addToGalleryButton}
                onClick={handleAddToGallery}
              >
                Add to Gallery
              </button>
            </div>
          </div>
        </div>
      )}
      {photos.length === 0 && <p>No photos found for this date.</p>}
    </div>
  );
}

export default MarsPhotos;
