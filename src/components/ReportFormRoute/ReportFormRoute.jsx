import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { Header, ReportForm, Footer } from "../index.js";
import { useGeolocation, useAppState } from "../../hooks";
import "../shared/RouteLayout.css";

const ReportFormRoute = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { coords, error, loading } = useGeolocation();
  const { handleReportSubmit } = useAppState();

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
    <div className="report-form-route">
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

      {/* Report Form Component */}
      <div className="report-form-content">
        <ReportForm coords={coords} onSubmit={handleReportSubmit} />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ReportFormRoute;
