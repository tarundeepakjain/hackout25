import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/Home"; // your new Home page
import ReportForm from "./components/ReportForm/ReportForm";
import MapView from "./components/MapView/MapView";
import Leaderboard from "./components/Leaderboard/Leaderboard";

export default function App() {
  const [reports, setReports] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [coords, setCoords] = useState(null);

  // get GPS location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error(err)
    );
  }, []);

  // handle new report submission
  const handleNewReport = (desc, file) => {
    if (!coords) return;

    const newReport = {
      id: Date.now(),
      desc,
      lat: coords[0],
      lng: coords[1],
      user: "User1",
      file,
    };

    setReports([...reports, newReport]);

    // update leaderboard (+10 points)
    const user = leaderboard.find((u) => u.name === "User1");
    if (user) {
      user.points += 10;
      setLeaderboard([...leaderboard]);
    } else {
      setLeaderboard([...leaderboard, { name: "User1", points: 10 }]);
    }
  };

  return (
    <Router>
      <Routes>
        {/* Default Home page route */}
        <Route path="/" element={<Home />} />

        {/* Existing dashboard stays */}
        <Route
          path="/dashboard"
          element={
            <div className="container">
              <div className="card">
                <ReportForm onSubmit={handleNewReport} />
              </div>

              <div className="map">
                <MapView reports={reports} />
              </div>

              <div className="card">
                <Leaderboard leaderboard={leaderboard} />
              </div>
            </div>
          }
        />

        {/* Home page route (optional, for /home) */}
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}
