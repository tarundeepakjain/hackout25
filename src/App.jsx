import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

export default function App() {
  const [reports, setReports] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [coords, setCoords] = useState(null);

  // get GPS location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setCoords([pos.coords.latitude, pos.coords.longitude]),
      (err) => console.error(err)
    );
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!coords) return;

    const newReport = {
      id: Date.now(),
      desc,
      lat: coords[0],
      lng: coords[1],
      user: "User1",
    };

    setReports([...reports, newReport]);

    // simple leaderboard (+10 points)
    const user = leaderboard.find((u) => u.name === "User1");
    if (user) {
      user.points += 10;
      setLeaderboard([...leaderboard]);
    } else {
      setLeaderboard([...leaderboard, { name: "User1", points: 10 }]);
    }

    setDesc("");
    setFile(null);
  };

  return (
    <div className="container">
      {/* Form */}
      <div className="card">
        <h2>Report Incident</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Describe issue..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button type="submit">Submit</button>
        </form>
      </div>

      {/* Map */}
      <div className="map">
        <MapContainer
          center={[20.5937, 78.9629]} // 🇮🇳 India's center (lat, lng)
          zoom={5}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {reports.map((r) => (
            <Marker key={r.id} position={[r.lat, r.lng]}>
              <Popup>
                <b>{r.user}</b>: {r.desc}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Leaderboard */}
      <div className="card">
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
      </div>
    </div>
  );
}
