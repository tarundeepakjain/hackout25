import { useState } from 'react';

const useAppState = () => {
  const [reports, setReports] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [showDataManager, setShowDataManager] = useState(false);

  // Handle report submission and update leaderboard
  const handleReportSubmit = (newReport) => {
    setReports(prevReports => [...prevReports, newReport]);

    // Update leaderboard (+10 points)
    setLeaderboard(prevLeaderboard => {
      const user = prevLeaderboard.find((u) => u.name === "User1");
      if (user) {
        return prevLeaderboard.map(u => 
          u.name === "User1" ? { ...u, points: u.points + 10 } : u
        );
      } else {
        return [...prevLeaderboard, { name: "User1", points: 10 }];
      }
    });
  };

  // Toggle data manager visibility
  const toggleDataManager = () => {
    setShowDataManager(prev => !prev);
  };

  return {
    reports,
    leaderboard,
    showDataManager,
    handleReportSubmit,
    toggleDataManager
  };
};

export default useAppState;
