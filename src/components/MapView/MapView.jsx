import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapView({ reports }) {
  return (
    <MapContainer
      center={[20.5937, 78.9629]} // 🇮🇳 India center
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
  );
}
