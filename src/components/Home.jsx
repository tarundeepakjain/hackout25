import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Community Mangrove Watch</h1>
          <p className={styles.heroDescription}>
            Protecting mangroves with the power of communities, technology, and
            citizen science.
          </p>
          <div className={styles.heroButtons}>
            <Link
              to="/report"
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              Report Incident
            </Link>
            <Link
              to="/map"
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              View Map
            </Link>
            <Link
              to="/leaderboard"
              className={`${styles.button} ${styles.buttonSecondary}`}
            >
              Leaderboard
            </Link>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className={styles.impact}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Impact</h2>
          <div className={styles.impactGrid}>
            <div className={styles.impactItem}>
              <div className={styles.impactNumber}>500+</div>
              <div className={styles.impactLabel}>Reports Submitted</div>
            </div>
            <div className={styles.impactItem}>
              <div className={styles.impactNumber}>20+</div>
              <div className={styles.impactLabel}>
                Coastal Communities Involved
              </div>
            </div>
            <div className={styles.impactItem}>
              <div className={styles.impactNumber}>10K+</div>
              <div className={styles.impactLabel}>Mangroves Protected</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Features</h2>
          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>📍</div>
              <h3 className={styles.featureTitle}>Report & Geotag Incidents</h3>
              <p className={styles.featureDescription}>
                Easily report mangrove threats with precise location data
              </p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🛰️</div>
              <h3 className={styles.featureTitle}>
                Real-Time Satellite Validation
              </h3>
              <p className={styles.featureDescription}>
                Verify reports with cutting-edge satellite imagery
              </p>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🎮</div>
              <h3 className={styles.featureTitle}>Gamified Conservation</h3>
              <p className={styles.featureDescription}>
                Earn points and compete while protecting our ecosystems
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gamification Teaser */}
      <section className={styles.gamification}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Leaderboard Preview</h2>
          <div className={styles.leaderboardPreview}>
            <ol className={styles.topUsers}>
              <li className={styles.userItem}>
                <span className={styles.userRank}>1</span>
                <span className={styles.userName}>EcoWarrior2024</span>
                <span className={styles.userPoints}>1,250 points</span>
              </li>
              <li className={styles.userItem}>
                <span className={styles.userRank}>2</span>
                <span className={styles.userName}>MangroveGuardian</span>
                <span className={styles.userPoints}>980 points</span>
              </li>
              <li className={styles.userItem}>
                <span className={styles.userRank}>3</span>
                <span className={styles.userName}>CoastalProtector</span>
                <span className={styles.userPoints}>875 points</span>
              </li>
            </ol>
            <Link
              to="/leaderboard"
              className={`${styles.button} ${styles.buttonPrimary}`}
            >
              View Full Leaderboard
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLinks}>
            <Link to="/about" className={styles.footerLink}>
              About
            </Link>
            <span className={styles.footerSeparator}>|</span>
            <Link to="/ngos" className={styles.footerLink}>
              NGOs
            </Link>
            <span className={styles.footerSeparator}>|</span>
            <Link to="/contact" className={styles.footerLink}>
              Contact
            </Link>
          </div>
          <p className={styles.footerTagline}>
            Together, we safeguard the mangroves 🌿
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
