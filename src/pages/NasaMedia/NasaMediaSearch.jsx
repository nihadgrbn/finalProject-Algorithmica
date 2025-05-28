import { useState, useEffect } from "react";
import styles from "./NasaMediaSearch.module.css";

const PAGE_SIZE = 12;
const default_query = "Astronomy";

function VideoPreview({ nasa_id, className }) {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    async function fetchVideo() {
      setLoading(true);
      try {
        const res = await fetch(`https://images-api.nasa.gov/asset/${nasa_id}`);
        const assetData = await res.json();
        const mp4 = assetData.collection.items.find(x => x.href.endsWith(".mp4"));
        if (!ignore) setVideoUrl(mp4?.href || null);
      } catch {
        if (!ignore) setVideoUrl(null);
      }
      setLoading(false);
    }
    fetchVideo();
    return () => { ignore = true; };
  }, [nasa_id]);

  if (loading) return <div className={styles.videoLoading}>Loading video...</div>;
  if (!videoUrl) return <div className={styles.videoError}>Video not found.</div>;
  return (
    <video controls className={className}>
      <source src={videoUrl} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
}

const NasaMediaSearch = () => {
  const [query, setQuery] = useState(default_query);
  const [mediaType, setMediaType] = useState("all");
  const [results, setResults] = useState([]);
  const [modalItem, setModalItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const fetchResults = async (searchTerm, type) => {
    setLoading(true);
    setResults([]);
    setModalItem(null);
    setVisibleCount(PAGE_SIZE);
    try {
      let url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(searchTerm)}`;
      if (type && type !== "all") url += `&media_type=${type}`;
      const res = await fetch(url);
      const data = await res.json();
      setResults(data.collection.items || []);
    } catch {
      setResults([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchResults(default_query, mediaType);
  }, [mediaType]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    fetchResults(query, mediaType);
  };

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  function renderMedia(item, isModal = false) {
    const data = item.data[0];
    const links = item.links || [];
    const type = data.media_type;

    if (type === "video") {
      if (isModal) {
        return (
          <VideoPreview
            nasa_id={data.nasa_id}
            className={styles.modalVideo}
          />
        );
      }
      return (
        <div className={styles.mediaVideoPlaceholder}>
          <span role="img" aria-label="video" style={{ fontSize: 48 }}></span>
        </div>
      );
    }

    const img = links.find(l => l.render === "image")?.href || links[0]?.href;
    if (img) {
      return <img src={img} alt={data.title} className={isModal ? styles.modalImg : styles.mediaImg} />;
    }
    return null;
  }

  return (
    <div className={styles.nasaMediaContainer}>
      <h2 className={styles.title}>NASA Media Search</h2>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Keyword (e.g., mars, jupiter, apollo...)"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className={styles.searchInput}
        />
        <select
          value={mediaType}
          onChange={e => setMediaType(e.target.value)}
          className={styles.mediaTypeSelect}
        >
          <option value="all">All</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>
        <button type="submit" className={styles.searchBtn}>Search</button>
      </form>
      {loading && <p>Loading...</p>}
      <div className={styles.mediaGrid}>
        {results.slice(0, visibleCount).map((item) => {
          const data = item.data[0];
          return (
            <div
              key={data.nasa_id}
              className={styles.mediaCard}
              onClick={() => setModalItem(item)}
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              {renderMedia(item)}
              <div className={styles.mediaTitle}>{data.title}</div>
            </div>
          );
        })}
      </div>
      {visibleCount < results.length && (
        <button className={styles.showMoreBtn} onClick={handleShowMore}>
          Show More
        </button>
      )}
      {modalItem && (
        <div className={styles.modal} onClick={() => setModalItem(null)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h3>{modalItem.data[0].title}</h3>
            <p>{modalItem.data[0].description}</p>
            {renderMedia(modalItem, true)}
            <button className={styles.closeBtn} onClick={() => setModalItem(null)}>Close</button>
          </div>
        </div>
      )}
      {!loading && results.length === 0 && query && <p>No results found.</p>}
    </div>
  );
};

export default NasaMediaSearch;
