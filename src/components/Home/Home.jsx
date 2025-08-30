import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Header, Footer } from "../index.js";
import styles from "./Home.module.css";

const Home = () => {
  console.log('Home component rendering with navigation cards');
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleNavigation = (route) => {
    console.log('Navigating to:', route);
    navigate(route);
  };

  return (
    <div className={styles.homeContainer}>
      {/* Header with Logout */}
      <div className={styles.headerSection}>
        <Header />
        <div className={styles.userSection}>
          <span className={styles.userInfo}>
            👤 {user?.name || 'User'}
          </span>
          <button className={styles.logoutButton} onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content - Navigation Cards */}
      <div className={styles.mainContent}>
        <h1 className={styles.welcomeTitle}>Welcome to Mangrove Guardian</h1>
        <p className={styles.welcomeSubtitle}>Choose an action to get started</p>
        
        <div className={styles.navigationGrid}>
          <div 
            className={styles.navCard} 
            onClick={() => handleNavigation('/report')}
          >
            <div className={styles.navIcon}>📝</div>
            <h3>Report Mangrove</h3>
            <p>Submit a new mangrove report</p>
          </div>

          <div 
            className={styles.navCard} 
            onClick={() => handleNavigation('/map')}
          >
            <div className={styles.navIcon}>🗺️</div>
            <h3>View Map</h3>
            <p>Explore mangrove locations</p>
          </div>

          <div 
            className={styles.navCard} 
            onClick={() => handleNavigation('/leaderboard')}
          >
            <div className={styles.navIcon}>🏆</div>
            <h3>Leaderboard</h3>
            <p>See top contributors</p>
          </div>

          <div 
            className={styles.navCard} 
            onClick={() => handleNavigation('/statistics')}
          >
            <div className={styles.navIcon}>📊</div>
            <h3>Statistics</h3>
            <p>View detailed analytics</p>
          </div>

          <div 
            className={styles.navCard} 
            onClick={() => handleNavigation('/data-manager')}
          >
            <div className={styles.navIcon}>⚙️</div>
            <h3>Data Manager</h3>
            <p>Manage your data</p>
          </div>

          <div 
            className={styles.navCard} 
            onClick={() => handleNavigation('/quick-links')}
          >
            <div className={styles.navIcon}>🔗</div>
            <h3>Quick Links</h3>
            <p>Access useful resources</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
