import React from "react";
import './Leaderboard.css';

export default function Leaderboard({ leaderboard }) {
  return (
    <>
      <h2>Leaderboard</h2>
      <ul>
        {leaderboard
          .sort((a, b) => b.points - a.points)
          .map((u, i) => (
            <li key={i}>
              {i + 1}. {u.name} — {u.points} pts
            </li>
          ))}
      </ul>
    </>
  );
}
