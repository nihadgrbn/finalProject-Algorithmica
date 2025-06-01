import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <h3>About</h3>
          <p>
            Planetarium by Nihad is your gateway to exploring the wonders of the
            universe. Stay curious and keep exploring!
          </p>
        </div>
        <div className={styles.footerSection}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/nasa-media">NASA Media</Link></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Contact</h3>
          <p>Email: nihadqurbanli204@gmail.com</p>
          <p>Phone: +994 70 935 5991</p>
        </div>
        <div className={styles.footerSection}>
          <h3>Follow Us</h3>
          <div className={styles.socialLinks}>
            <a href="https://github.com/nihadgrbn" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/nihad-qurbanl%C4%B1-46083530a/" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
      <div className={styles.footerNav}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/nasa-picture">Daily Photo</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/nasa-media">NASA Media</Link></li>
        </ul>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Planetarium by Nihad. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
