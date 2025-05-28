import { useState } from "react";
import { FaGithub, FaReact } from "react-icons/fa";
import { SiNasa, SiCssmodules, SiReactrouter } from "react-icons/si";
import styles from "./About.module.css";

const About = () => (
  <div className={styles.aboutBg}>
    <div className={styles.aboutContainer}>
      <section className={styles.heroSection}>
        <div>
          <h1 className={styles.heroTitle}>About Planetarium</h1>
          <p className={styles.heroSubtitle}>
            Planetarium is a modern web platform to explore the Solar System, Mars missions, and NASA's media archive. Our mission is to make space science accessible and inspiring for everyone.
          </p>
        </div>
        <img
          src="https://images-assets.nasa.gov/image/PIA12235/PIA12235~orig.jpg"
          alt="Solar System"
          className={styles.heroImage}
        />
      </section>

      <section className={styles.missionSection}>
        <img
          src="https://images-assets.nasa.gov/image/PIA03149/PIA03149~orig.jpg"
          alt="Mars Rover"
          className={styles.missionImage}
        />
        <div>
          <h2 className={styles.sectionTitle}>Our Mission</h2>
          <p className={styles.sectionText}>
            We believe in fostering curiosity more than just knowledge. Planetarium helps you explore planets, Mars missions, and NASA's vast media archive with interactive tools and beautiful design.
          </p>
        </div>
      </section>

      <section className={styles.storySection}>
        <div>
          <h2 className={styles.sectionTitle}>Our Story</h2>
          <p className={styles.sectionText}>
            Starting as a passion project, Planetarium combines open NASA APIs and modern web technologies to create an engaging and educational experience for space enthusiasts of all ages.
          </p>
        </div>
        <img
          src="https://images-assets.nasa.gov/image/PIA17011/PIA17011~orig.jpg"
          alt="Astronomy"
          className={styles.storyImage}
        />
      </section>

      <section className={styles.statsSection}>
        <h2 className={styles.sectionTitle}>Planetarium in Numbers</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>🪐</span>
            <div className={styles.statNumber}>8</div>
            <div className={styles.statLabel}>Planets</div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>🚀</span>
            <div className={styles.statNumber}>5+</div>
            <div className={styles.statLabel}>Mars Missions</div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>📸</span>
            <div className={styles.statNumber}>10,000+</div>
            <div className={styles.statLabel}>NASA Images</div>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statIcon}>⭐</span>
            <div className={styles.statNumber}>∞</div>
            <div className={styles.statLabel}>Favorites</div>
          </div>
        </div>
      </section>

      <section className={styles.techSection}>
        <h2 className={styles.sectionTitle}>Technologies Used</h2>
        <ul className={styles.techList}>
          <li><FaReact color="#61dafb" className={styles.techIcon} /> React</li>
          <li><SiReactrouter color="#CA4245" className={styles.techIcon} /> React Router</li>
          <li><SiCssmodules color="#2965f1" className={styles.techIcon} /> CSS Modules</li>
          <li><SiNasa color="#fc3d21" className={styles.techIcon} /> NASA Open APIs</li>
        </ul>
      </section>

      <section className={styles.teamSection}>
        <h2 className={styles.sectionTitle}>Team</h2>
        <div className={styles.teamCard}>
          <img
            src="https://avatars.githubusercontent.com/u/your-github-id?v=4"
            alt="Nihad Qurbanli"
            className={styles.avatar}
          />
          <div>
            <b>Nihad Qurbanli</b>
            <div>Frontend Developer</div>
            <a
              href="https://github.com/nihadgrbn"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.ghLink}
            >
              <FaGithub /> GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div>
          <b>Contact:</b>{" "}
          <a href="mailto:nihadqurbanli204@gmail.com">nihadqurbanli204@gmail.com</a>
        </div>
        <div>
          <a
            href="https://github.com/nihadgrbn"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.ghLink}
          >
            <FaGithub /> GitHub
          </a>
        </div>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} Planetarium. All rights reserved.
        </div>
      </footer>
    </div>
  </div>
);

export default About;
