import React from 'react';

const Leaderboard = ({ leaderboard }) => {
  return (
    <div className="card">
      <h2 className="card-title">
        🏆 Environmental Champions
      </h2>
      <div className="leaderboard">
        {leaderboard.length > 0 ? (
          <ul className="leaderboard-list">
            {leaderboard
              .sort((a, b) => b.points - a.points)
              .map((user, index) => (
                <li key={index} className={`leaderboard-item rank-${index + 1}`}>
                  <span className="rank">#{index + 1}</span>
                  <span className="username">{user.name}</span>
                  <span className="points">{user.points} pts</span>
                  <span className="badge">
                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '🌟'}
                  </span>
                </li>
              ))}
          </ul>
        ) : (
          <div className="empty-leaderboard">
            <p>🌱 Be the first to report an environmental issue and earn points!</p>
          </div>
        )}
      </div>
      
      <div className="leaderboard-info">
        <h4>🎯 How to Earn Points:</h4>
        <ul>
          <li>📝 Report environmental issues: +10 points</li>
          <li>📸 Include photo evidence: +5 bonus points</li>
          <li>✅ Verified reports: +15 bonus points</li>
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;