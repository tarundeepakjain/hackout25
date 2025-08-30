import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Header, Leaderboard, Footer } from "../index.js";
import { useAppState } from "../../hooks";
import "../shared/RouteLayout.css";

const LeaderboardRoute = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { leaderboard } = useAppState();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="leaderboard-route">
      {/* Header with Navigation and Logout */}
      <div className="header-section">
        <div className="nav-section">
          <button className="back-button" onClick={() => navigate('/home')}>
            ← Back to Home
          </button>
          <Header />
        </div>
        <div className="user-section">
          <span className="user-info">
            👤 {user?.name || 'User'}
          </span>
          <button className="logout-button" onClick={handleLogout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Leaderboard Component */}
      <div className="leaderboard-content">
        <Leaderboard leaderboard={leaderboard} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LeaderboardRoute;
