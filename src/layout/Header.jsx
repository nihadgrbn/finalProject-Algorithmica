import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <h1>Planetarium</h1>
      <nav className={`${styles.navMenu} ${menuOpen ? styles.open : ""}`}>
        <Link
          to="/"
          onClick={() => setMenuOpen(false)}
          className={location.pathname === "/" ? styles.activeNav : ""}
        >
          Home
        </Link>
        <Link
          to="/about"
          onClick={() => setMenuOpen(false)}
          className={location.pathname === "/about" ? styles.activeNav : ""}
        >
          About
        </Link>
        <Link
          to="/favorites"
          onClick={() => setMenuOpen(false)}
          className={location.pathname === "/favorites" ? styles.activeNav : ""}
        >
          Favorites
        </Link>
        <Link
          to="/gallery"
          onClick={() => setMenuOpen(false)}
          className={location.pathname === "/gallery" ? styles.activeNav : ""}
        >
          My Gallery
        </Link>
        {isMobile ? (
          <>
            <Link
              to="/nasa-picture"
              onClick={() => setMenuOpen(false)}
              className={
                location.pathname === "/nasa-picture"
                  ? styles.activeNav
                  : ""
              }
            >
              NASA Daily Photo
            </Link>
            <Link
              to="/mars-photos"
              onClick={() => setMenuOpen(false)}
              className={
                location.pathname === "/mars-photos" ? styles.activeNav : ""
              }
            >
              Mars Photos
            </Link>
            <Link
              to="/nasa-media"
              onClick={() => setMenuOpen(false)}
              className={
                location.pathname === "/nasa-media" ? styles.activeNav : ""
              }
            >
              NASA Media
            </Link>
            <Link
              to="/neo"
              onClick={() => setMenuOpen(false)}
              className={location.pathname === "/neo" ? styles.activeNav : ""}
            >
              NEO Asteroids
            </Link>
          </>
        ) : (
          <div className={styles.dropdown}>
            <span
              className={styles.dropdownToggle + " " + styles.navLink}
              onClick={() => setMoreOpen((prev) => !prev)}
              tabIndex={0}
              role="button"
              aria-expanded={moreOpen}
              style={{ cursor: "pointer" }}
            >
              More
            </span>
            <div
              className={`${styles.dropdownMenu} ${
                moreOpen ? styles.show : ""
              }`}
            >
              <Link
                to="/nasa-picture"
                onClick={() => {
                  setMenuOpen(false);
                  setMoreOpen(false);
                }}
                className={
                  location.pathname === "/nasa-picture"
                    ? styles.activeNav
                    : ""
                }
              >
                NASA Daily Photo
              </Link>
              <Link
                to="/mars-photos"
                onClick={() => {
                  setMenuOpen(false);
                  setMoreOpen(false);
                }}
                className={
                  location.pathname === "/mars-photos" ? styles.activeNav : ""
                }
              >
                Mars Photos
              </Link>
              <Link
                to="/nasa-media"
                onClick={() => {
                  setMenuOpen(false);
                  setMoreOpen(false);
                }}
                className={
                  location.pathname === "/nasa-media" ? styles.activeNav : ""
                }
              >
                NASA Media
              </Link>
              <Link
                to="/neo"
                onClick={() => {
                  setMenuOpen(false);
                  setMoreOpen(false);
                }}
                className={location.pathname === "/neo" ? styles.activeNav : ""}
              >
                NEO Asteroids
              </Link>
            </div>
          </div>
        )}
      </nav>
      <div className={styles.authBtns}>
        <button
          className={styles.authBtn}
          onClick={() => navigate("/login")}
        >
          Log In
        </button>
        <button
          className={styles.authBtn}
          onClick={() => navigate("/register")}
        >
          Register
        </button>
        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation"
        >
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
          <span className={styles.hamburgerBar}></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
