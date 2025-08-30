// src/components/MapView/MapView.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, LayersControl } from "react-leaflet";
import { useMangroves } from '../../hooks';
import "leaflet/dist/leaflet.css";
import './MapView.css';

const { BaseLayer, Overlay } = LayersControl;

const MapView = ({ reports = [], userCoords = null }) => {
  const { mangroves, loadMangroves } = useMangroves();
  const [selectedMangrove, setSelectedMangrove] = useState(null);

  // 🌿 Sample Indian Mangrove Polygon Data (replace with real GMW v4.0 data)
  const sampleMangrovePolygons = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          name: "Sundarbans Mangrove Complex",
          state: "West Bengal",
          area_hectares: 426200,
          conservation_status: "UNESCO World Heritage Site",
          threat_level: "High",
          species_count: 120,
          description: "World's largest mangrove forest and UNESCO World Heritage Site"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [88.8, 21.4], [89.6, 21.4], [89.6, 22.4], [88.8, 22.4], [88.8, 21.4]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Bhitarkanika Mangroves",
          state: "Odisha",
          area_hectares: 67200,
          conservation_status: "National Park",
          threat_level: "Medium",
          species_count: 89,
          description: "Important saltwater crocodile habitat"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [86.7, 20.5], [87.1, 20.5], [87.1, 20.9], [86.7, 20.9], [86.7, 20.5]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Pichavaram Mangroves",
          state: "Tamil Nadu",
          area_hectares: 1100,
          conservation_status: "Protected Forest",
          threat_level: "Low",
          species_count: 45,
          description: "Second largest mangrove forest in India"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [79.7, 11.4], [79.8, 11.4], [79.8, 11.5], [79.7, 11.5], [79.7, 11.4]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Coringa Mangroves",
          state: "Andhra Pradesh",
          area_hectares: 23500,
          conservation_status: "Wildlife Sanctuary",
          threat_level: "High",
          species_count: 67,
          description: "Second largest stretch of mangrove forests in India"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [82.1, 16.6], [82.4, 16.6], [82.4, 16.9], [82.1, 16.9], [82.1, 16.6]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Godavari Delta Mangroves",
          state: "Andhra Pradesh",
          area_hectares: 15000,
          conservation_status: "Protected",
          threat_level: "Medium",
          species_count: 52,
          description: "Important bird sanctuary and fishing ground"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [81.9, 16.2], [82.1, 16.2], [82.1, 16.4], [81.9, 16.4], [81.9, 16.2]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Muthupet Mangroves",
          state: "Tamil Nadu",
          area_hectares: 6803,
          conservation_status: "Protected",
          threat_level: "Medium",
          species_count: 38,
          description: "Important stopover for migratory birds"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [79.5, 10.35], [79.55, 10.35], [79.55, 10.45], [79.5, 10.45], [79.5, 10.35]
          ]]
        }
      }
    ]
  };

  // 🎨 Styling function for mangrove polygons
  const getMangroveStyle = (feature) => {
    const threatColors = {
      'Low': '#10B981',      // Green
      'Medium': '#F59E0B',   // Orange  
      'High': '#EF4444'      // Red
    };

    return {
      fillColor: threatColors[feature.properties.threat_level] || '#10B981',
      weight: 2,
      opacity: 1,
      color: '#047857',
      dashArray: '',
      fillOpacity: 0.7
    };
  };

  // 🖱️ Interaction handlers
  const onEachMangrove = (feature, layer) => {
    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 3,
          fillOpacity: 0.9,
          color: '#065F46'
        });
      },
      mouseout: (e) => {
        const layer = e.target;
        layer.setStyle(getMangroveStyle(feature));
      },
      click: (e) => {
        setSelectedMangrove(feature.properties);
      }
    });

    // Bind popup with enhanced styling
    layer.bindPopup(`
      <div class="mangrove-popup">
        <h3 class="popup-title">
          🌿 ${feature.properties.name}
        </h3>
        <div class="popup-content">
          <div class="popup-row">
            <span class="popup-label">📍 State:</span>
            <span class="popup-value">${feature.properties.state}</span>
          </div>
          <div class="popup-row">
            <span class="popup-label">📏 Area:</span>
            <span class="popup-value">${feature.properties.area_hectares.toLocaleString()} ha</span>
          </div>
          <div class="popup-row">
            <span class="popup-label">🛡️ Status:</span>
            <span class="popup-value">${feature.properties.conservation_status}</span>
          </div>
          <div class="popup-row">
            <span class="popup-label">⚠️ Threat:</span>
            <span class="popup-value threat-${feature.properties.threat_level.toLowerCase()}">
              ${feature.properties.threat_level}
            </span>
          </div>
          <div class="popup-row">
            <span class="popup-label">🐾 Species:</span>
            <span class="popup-value">${feature.properties.species_count} recorded</span>
          </div>
          <div class="popup-description">
            <p>${feature.properties.description}</p>
          </div>
        </div>
      </div>
    `);
  };

  return (
    <div className="mapview-container">
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
        className="leaflet-map"
      >
        <LayersControl position="topright">
          {/* Base Layers */}
          <BaseLayer checked name="🗺️ Street Map">
            <TileLayer 
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </BaseLayer>
          
          <BaseLayer name="🛰️ Satellite">
            <TileLayer 
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Esri &copy; World Imagery"
            />
          </BaseLayer>

          <BaseLayer name="🌊 Ocean Basemap">
            <TileLayer 
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}"
              attribution="Esri &copy; Ocean Basemap"
            />
          </BaseLayer>

          <BaseLayer name="🌍 Dark Theme">
            <TileLayer 
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution="&copy; CARTO"
            />
          </BaseLayer>

          {/* Overlay Layers */}
          <Overlay checked name="🌿 Mangrove Forests">
            <GeoJSON
              data={sampleMangrovePolygons}
              style={getMangroveStyle}
              onEachFeature={onEachMangrove}
            />
          </Overlay>

          <Overlay checked name="📍 Incident Reports">
            <>
              {reports.map((report) => (
                <Marker key={report.id} position={[report.lat, report.lng]}>
                  <Popup>
                    <div className="report-popup">
                      <h4 className="popup-title report-title">
                        🚨 Incident Report
                      </h4>
                      <div className="popup-content">
                        <div className="popup-row">
                          <span className="popup-label">👤 Reporter:</span>
                          <span className="popup-value">{report.user}</span>
                        </div>
                        <div className="popup-row">
                          <span className="popup-label">📝 Issue:</span>
                          <span className="popup-value">{report.desc}</span>
                        </div>
                        <div className="popup-row">
                          <span className="popup-label">📍 Coordinates:</span>
                          <span className="popup-value">
                            {report.lat.toFixed(4)}, {report.lng.toFixed(4)}
                          </span>
                        </div>
                        <div className="popup-row">
                          <span className="popup-label">🕒 Reported:</span>
                          <span className="popup-value">
                            {new Date(report.id).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </>
          </Overlay>
        </LayersControl>

        {/* User Location Marker */}
        {userCoords && (
          <Marker position={userCoords}>
            <Popup>
              <div className="user-location-popup">
                <h4 className="popup-title user-title">
                  📍 Your Location
                </h4>
                <div className="popup-content">
                  <p><strong>Latitude:</strong> {userCoords[0].toFixed(6)}</p>
                  <p><strong>Longitude:</strong> {userCoords[1].toFixed(6)}</p>
                  <p className="location-note">
                    🌿 Find nearby mangroves and report environmental issues
                  </p>
                </div>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Legend Panel */}
      <div className="map-legend">
        <h4 className="legend-title">🌿 Mangrove Threat Levels</h4>
        <div className="legend-items">
          <div className="legend-item">
            <div className="legend-color low-risk"></div>
            <span>Low Risk - Well Protected</span>
          </div>
          <div className="legend-item">
            <div className="legend-color medium-risk"></div>
            <span>Medium Risk - Some Threats</span>
          </div>
          <div className="legend-item">
            <div className="legend-color high-risk"></div>
            <span>High Risk - Critical</span>
          </div>
        </div>
        <div className="legend-note">
          💡 Click on mangrove areas for detailed information
        </div>
      </div>

      {/* Statistics Panel */}
      <div className="map-stats">
        <h4 className="stats-title">📊 India Mangrove Statistics</h4>
        <div className="stats-grid">
          <div className="stat-item">
            <span className="stat-number">{sampleMangrovePolygons.features.length}</span>
            <span className="stat-label">Protected Areas</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {Math.round(sampleMangrovePolygons.features
                .reduce((sum, f) => sum + f.properties.area_hectares, 0) / 1000)}K
            </span>
            <span className="stat-label">Hectares</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{reports.length}</span>
            <span className="stat-label">Reports</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {sampleMangrovePolygons.features
                .reduce((sum, f) => sum + f.properties.species_count, 0)}
            </span>
            <span className="stat-label">Species</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;