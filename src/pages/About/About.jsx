import { FaReact, FaGithub, FaRocket, FaGlobeAmericas, FaImage, FaHeart, FaUserAstronaut } from 'react-icons/fa';
import { SiNasa, SiCssmodules, SiReactrouter, SiJavascript, SiHtml5, SiNetlify } from 'react-icons/si';
import styles from './About.module.css';

const AboutPage = () => {

  return (
    <div className={styles.aboutPage}>
      <div className={styles.starsBackground}></div>
      
      <div className={`${styles.container} ${styles.container}`}>
        <section className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>About Planetarium</h1>
            <p className={styles.heroSubtitle}>
              Planetarium is a modern web platform to explore the Solar System, Mars missions, and NASA's media archive. 
              Our mission is to make space science accessible and inspiring for everyone.
            </p>
            <div className={styles.buttonGroup}>
              <button className={styles.primaryButton}>Explore Space</button>
              <button className={styles.secondaryButton}>Learn More</button>
            </div>
          </div>
          <div className={styles.heroImageContainer}>
            <div className={styles.heroImageGlow}></div>
            <img 
              src="https://images-assets.nasa.gov/image/PIA12235/PIA12235~orig.jpg" 
              alt="Solar System" 
              className={styles.heroImage}
            />
          </div>
        </section>

        <div className={styles.contentSection}>
          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <FaRocket className={styles.statIcon} />
              </div>
              <h2 className={styles.cardTitle}>Our Mission</h2>
            </div>
            <p className={styles.cardText}>
              We believe in fostering curiosity more than just knowledge. Planetarium helps you explore planets, 
              Mars missions, and NASA's vast media archive with interactive tools and beautiful design.
            </p>
            <div className={styles.cardImage}>
              <img 
                src="https://images-assets.nasa.gov/image/PIA03149/PIA03149~orig.jpg" 
                alt="Mars Rover" 
              />
            </div>
          </div>

          <div className={styles.contentCard}>
            <div className={styles.cardHeader}>
              <div className={styles.cardIcon}>
                <FaUserAstronaut className={styles.statIcon} />
              </div>
              <h2 className={styles.cardTitle}>Our Story</h2>
            </div>
            <p className={styles.cardText}>
              Starting as a passion project, Planetarium combines open NASA APIs and modern web technologies 
              to create an engaging and educational experience for space enthusiasts of all ages.
            </p>
            <div className={styles.cardImage}>
              <img 
                src="https://images-assets.nasa.gov/image/PIA17011/PIA17011~orig.jpg" 
                alt="Astronomy" 
              />
            </div>
          </div>
        </div>

        <section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Planetarium in Numbers</h2>
            <p className={styles.sectionSubtitle}>Discover the cosmic scale of our platform through key metrics</p>
          </div>
          
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIconContainer}>
                <FaGlobeAmericas className={styles.statIcon} />
              </div>
              <div className={styles.statNumber}>8</div>
              <div className={styles.statLabel}>Planets</div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIconContainer}>
                <FaRocket className={styles.statIcon} />
              </div>
              <div className={styles.statNumber}>5+</div>
              <div className={styles.statLabel}>Mars Missions</div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIconContainer}>
                <FaImage className={styles.statIcon} />
              </div>
              <div className={styles.statNumber}>10,000+</div>
              <div className={styles.statLabel}>NASA Images</div>
            </div>
            
            <div className={styles.statCard}>
              <div className={styles.statIconContainer}>
                <FaHeart className={styles.statIcon} />
              </div>
              <div className={styles.statNumber}>∞</div>
              <div className={styles.statLabel}>Favorites</div>
            </div>
          </div>
        </section>

        <section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Technologies Used</h2>
            <p className={styles.sectionSubtitle}>The cosmic tools powering our journey</p>
          </div>
          
          <div className={styles.techGrid}>
            <div className={styles.techCard}>
              <FaReact className={styles.techIcon} style={{ color: '#61DAFB' }} />
              <div className={styles.techName}>React</div>
            </div>
            
            <div className={styles.techCard}>
              <SiJavascript className={styles.techIcon} style={{ color: '#F7DF1E' }} />
              <div className={styles.techName}>JavaScript</div>
            </div>
            
            <div className={styles.techCard}>
              <SiHtml5 className={styles.techIcon} style={{ color: '#E34F26' }} />
              <div className={styles.techName}>HTML5</div>
            </div>
            
            <div className={styles.techCard}>
              <SiCssmodules className={styles.techIcon} style={{ color: '#2965f1' }} />
              <div className={styles.techName}>CSS Modules</div>
            </div>
            
            <div className={styles.techCard}>
              <SiReactrouter className={styles.techIcon} style={{ color: '#CA4245' }} />
              <div className={styles.techName}>React Router</div>
            </div>
            
            <div className={styles.techCard}>
              <SiNasa className={styles.techIcon} style={{ color: '#FC3D21' }} />
              <div className={styles.techName}>NASA APIs</div>
            </div>
          </div>
        </section>

        <section>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Cosmic Crew</h2>
            <p className={styles.sectionSubtitle}>The brilliant minds navigating Planetarium</p>
          </div>
          
          <div className={styles.teamGrid}>
            <div className={styles.teamCard}>
              <div className={styles.avatar}>
                <img 
                  src="https://avatars.githubusercontent.com/u/67826218?v=4" 
                  alt="Nihad Qurbanli" 
                />
              </div>
              <div className={styles.teamInfo}>
                <h3 className={styles.teamName}>Nihad Qurbanli</h3>
                <p className={styles.teamRole}>Full Stack Developer</p>
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
              </div>
            </div>
          </div>
        </section>

        <footer className={styles.footer}>
          <div>
            <h3 className={styles.footerTitle}>Planetarium</h3>
            <p className={styles.footerText}>
              Your portal to the cosmos, bringing the wonders of space to your fingertips
            </p>
          </div>
          
          <div className={styles.socialLinks}>
            <a 
              href="https://github.com/nihadgrbn" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.socialLink}
            >
              <FaGithub />
            </a>
            <a 
              href="mailto:nihadqurbanli204@gmail.com" 
              className={styles.socialLink}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
          
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Planetarium. All rights reserved. Made with ♥ and ☄️
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AboutPage;