import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Header, QuickLinks, Footer } from "../index.js";
import "../shared/RouteLayout.css";

const QuickLinksRoute = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="quick-links-route">
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

      {/* Quick Links Section */}
      <div className="quick-links-content">
        <QuickLinks />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default QuickLinksRoute;
