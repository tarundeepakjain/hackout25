import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Header, DataManager, Footer } from "../index.js";
import { useAppState } from "../../hooks";
import "../shared/RouteLayout.css";

const DataManagerRoute = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { showDataManager, toggleDataManager } = useAppState();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="data-manager-route">
      {/* Header with Navigation and Logout */}
      <div className="header-section">
        <div className="nav-section">
          <button className="back-button" onClick={() => navigate('/home')}>
            ← Back to Home
          </button>
          <Header 
            showDataManager={showDataManager} 
            onToggleDataManager={toggleDataManager} 
          />
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

      {/* Data Manager Component */}
      <div className="data-manager-content">
        <DataManager />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default DataManagerRoute;
