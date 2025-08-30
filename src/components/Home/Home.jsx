import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import {
  DataManager,
  MapSection,
  Leaderboard,
  ReportForm,
  Header,
  StatisticsDashboard,
  QuickLinks,
  Footer
} from "../index.js";
import { useGeolocation, useAppState } from "../../hooks";
import styles from "./Home.module.css";

const Home = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { coords, error, loading } = useGeolocation();
  const { 
    reports, 
    leaderboard, 
    showDataManager, 
    handleReportSubmit, 
    toggleDataManager 
  } = useAppState();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner">🌿</div>
        <p>Getting your location...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h2>Location Access Required</h2>
        <p>{error}</p>
        <p>Please enable location access to use this app.</p>
      </div>
    );
  }

  return (
    <div className={styles.homeContainer}>
      {/* Header with Data Manager Toggle and Logout */}
      <div className={styles.headerSection}>
        <Header 
          showDataManager={showDataManager} 
          onToggleDataManager={toggleDataManager} 
        />
        <div className={styles.userSection}>
          <span className={styles.userInfo}>
            👤 {user?.name || 'User'}
          </span>
          <button className={styles.logoutButton} onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Conditional Data Manager Panel */}
      {showDataManager && (
        <div className="data-manager-panel">
          <DataManager />
        </div>
      )}

      {/* Report Form Component */}
      <ReportForm coords={coords} onSubmit={handleReportSubmit} />

      {/* Interactive Map Section */}
      <MapSection reports={reports} userCoords={coords} />

      {/* Leaderboard Component */}
      <Leaderboard leaderboard={leaderboard} />

      {/* Statistics Dashboard */}
      <StatisticsDashboard reports={reports} leaderboard={leaderboard} />

      {/* Quick Links Section */}
      <QuickLinks />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
