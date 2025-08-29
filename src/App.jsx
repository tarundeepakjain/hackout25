import { useState, useEffect } from "react";
import "./App.css";
import DataManager from "./components/DataManager.jsx";
import MapView from "./components/MapView/MapView.jsx";
import Leaderboard from "./components/Leaderboard/Leaderboard.jsx";
import ReportForm from "./components/ReportForm/ReportForm.jsx";

export default function App() {
  const [reports, setReports] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [coords, setCoords] = useState(null);
  const [showDataManager, setShowDataManager] = useState(false);

  // 📍 Get GPS location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error("Location access denied:", err)
    );
  }, []);

  // 📝 Handle report submission from ReportForm component
  const handleReportSubmit = (newReport) => {
    setReports([...reports, newReport]);

    // 🏆 Update leaderboard (+10 points)
    const user = leaderboard.find((u) => u.name === "User1");
    if (user) {
      user.points += 10;
      setLeaderboard([...leaderboard]);
    } else {
      setLeaderboard([...leaderboard, { name: "User1", points: 10 }]);
    }
  };

  return (
    <div className="container">
      {/* 🌿 Data Manager Toggle Button */}
      <div className="data-manager-toggle">
        <button
          onClick={() => setShowDataManager(!showDataManager)}
          className={`toggle-btn ${showDataManager ? 'active' : ''}`}
          title={showDataManager ? 'Close Mangrove Data' : 'Open Mangrove Data Manager'}
        >
          {showDataManager ? '❌ Close' : '🌿 Mangrove Data'}
        </button>
      </div>

      {/* 📊 Conditional Data Manager Panel */}
      {showDataManager && (
        <div className="data-manager-panel">
          <DataManager />
        </div>
      )}

      {/* 📝 Report Form Component */}
      <ReportForm coords={coords} onSubmit={handleReportSubmit} />

      {/* 🗺️ Interactive Map */}
      <div className="map-section">
        <div className="map-header">
          <h2>🌍 Interactive Mangrove Map</h2>
          <p>Explore India's mangrove forests and view reported environmental issues</p>
        </div>
        <div className="map">
          <MapView reports={reports} userCoords={coords} />
        </div>
      </div>

      {/* 🏆 Leaderboard Component */}
      <Leaderboard leaderboard={leaderboard} />

      {/* 📊 Statistics Dashboard */}
      <div className="stats-section">
        <h3>📈 Impact Statistics</h3>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{reports.length}</div>
            <div className="stat-label">Reports Submitted</div>
            <div className="stat-icon">📝</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">{leaderboard.length}</div>
            <div className="stat-label">Active Contributors</div>
            <div className="stat-icon">👥</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">
              {leaderboard.reduce((total, user) => total + user.points, 0)}
            </div>
            <div className="stat-label">Total Points Earned</div>
            <div className="stat-icon">🏆</div>
          </div>

          <div className="stat-card">
            <div className="stat-number">6</div>
            <div className="stat-label">Mangrove Areas Monitored</div>
            <div className="stat-icon">🌿</div>
          </div>
        </div>
      </div>

      {/* 🔗 Quick Links */}
      <div className="card">
        <h3>🔗 Learn More About Mangroves</h3>
        <div className="quick-links">
          <a
            href="https://globalmangrovewatch.org"
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
          >
            <div className="link-icon">🌍</div>
            <div className="link-content">
              <h4>Global Mangrove Watch</h4>
              <p>Monitor mangrove forests worldwide</p>
            </div>
          </a>

          <a
            href="https://www.mangroveactionproject.org"
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
          >
            <div className="link-icon">🌱</div>
            <div className="link-content">
              <h4>Mangrove Action Project</h4>
              <p>Conservation and restoration efforts</p>
            </div>
          </a>

          <a
            href="https://www.iucnredlist.org"
            target="_blank"
            rel="noopener noreferrer"
            className="link-card"
          >
            <div className="link-icon">🐾</div>
            <div className="link-content">
              <h4>Species Conservation</h4>
              <p>Mangrove biodiversity protection</p>
            </div>
          </a>
        </div>
      </div>

      {/* 📱 Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p>🌿 <strong>HackOut25 - Environmental Conservation Platform</strong></p>
          <p>Help protect India's precious mangrove ecosystems through community reporting and awareness</p>
          <div className="footer-links">
            <span>Made with 💚 for our planet</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
