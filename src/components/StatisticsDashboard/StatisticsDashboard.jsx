import React from 'react';
import './StatisticsDashboard.css';

const StatisticsDashboard = ({ reports, leaderboard }) => {
  const totalPoints = leaderboard.reduce((total, user) => total + user.points, 0);

  return (
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
          <div className="stat-number">{totalPoints}</div>
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
  );
};

export default StatisticsDashboard;
