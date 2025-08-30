import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import "./StatisticsDashboard.css";

const COLORS = ["#10B981", "#F59E0B", "#EF4444"]; // Low, Medium, High

const StatisticsDashboard = ({ reports, leaderboard, mangroveStats }) => {
  const totalPoints = leaderboard.reduce(
    (total, user) => total + user.points,
    0
  );

  // Example threat level data for pie chart
  const threatData = mangroveStats || [
    { name: "Low", value: 3 },
    { name: "Medium", value: 2 },
    { name: "High", value: 1 },
  ];

  return (
    <div className="stats-section">
      <h3>📈 Impact Statistics</h3>

      <div className="stats-grid">
        {/* Cards */}
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
          <div className="stat-number">
            {threatData.reduce((sum, t) => sum + t.value, 0)}
          </div>
          <div className="stat-label">Mangrove Areas Monitored</div>
          <div className="stat-icon">🌿</div>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-container">
        {/* Leaderboard Bar Chart */}
        <div className="chart-card">
          <h4>🏅 Leaderboard Points</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={leaderboard} margin={{ top: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="points" fill="#4a7c59" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Threat Level Pie Chart */}
        <div className="chart-card">
          <h4>⚠️ Mangrove Threat Levels</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={threatData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {threatData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default StatisticsDashboard;
