import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, LayersControl } from "react-leaflet";
import { useMangroves } from '../hooks';
import "leaflet/dist/leaflet.css";

const { BaseLayer, Overlay } = LayersControl;

const EnhancedMangroveMap = ({ reports, coords }) => {
  const { mangroves, loadMangroves } = useMangroves();
  const [selectedMangrove, setSelectedMangrove] = useState(null);

  // 🌿 Sample Indian Mangrove Polygon Data (you'll replace with real GMW v4.0 data)
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
          species_count: 120
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [88.8, 21.4],
            [89.6, 21.4],
            [89.6, 22.4],
            [88.8, 22.4],
            [88.8, 21.4]
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
          species_count: 89
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [86.7, 20.5],
            [87.1, 20.5],
            [87.1, 20.9],
            [86.7, 20.9],
            [86.7, 20.5]
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
          species_count: 45
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [79.7, 11.4],
            [79.8, 11.4],
            [79.8, 11.5],
            [79.7, 11.5],
            [79.7, 11.4]
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
          species_count: 67
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [82.1, 16.6],
            [82.4, 16.6],
            [82.4, 16.9],
            [82.1, 16.9],
            [82.1, 16.6]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Godavari Mangroves",
          state: "Andhra Pradesh",
          area_hectares: 15000,
          conservation_status: "Protected",
          threat_level: "Medium",
          species_count: 52
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [81.9, 16.2],
            [82.1, 16.2],
            [82.1, 16.4],
            [81.9, 16.4],
            [81.9, 16.2]
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

    // Bind popup
    layer.bindPopup(`
      <div style="font-family: Arial, sans-serif;">
        <h3 style="margin: 0 0 8px 0; color: #047857; font-size: 16px;">
          🌿 ${feature.properties.name}
        </h3>
        <div style="font-size: 13px; line-height: 1.4;">
          <p><strong>📍 State:</strong> ${feature.properties.state}</p>
          <p><strong>📏 Area:</strong> ${feature.properties.area_hectares.toLocaleString()} hectares</p>
          <p><strong>🛡️ Status:</strong> ${feature.properties.conservation_status}</p>
          <p><strong>⚠️ Threat Level:</strong> 
            <span style="color: ${getMangroveStyle(feature).fillColor}; font-weight: bold;">
              ${feature.properties.threat_level}
            </span>
          </p>
          <p><strong>🐾 Species:</strong> ${feature.properties.species_count} recorded</p>
        </div>
      </div>
    `);
  };

  return (
    <div style={{ height: "100%", width: "100%", position: "relative" }}>
      <MapContainer
        center={[20.5937, 78.9629]}
        zoom={5}
        style={{ height: "100%", width: "100%" }}
      >
        <LayersControl position="topright">
          {/* Base Layers */}
          <BaseLayer checked name="🗺️ OpenStreetMap">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          </BaseLayer>
          
          <BaseLayer name="🛰️ Satellite">
            <TileLayer 
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution="Esri &copy; World Imagery"
            />
          </BaseLayer>

          <BaseLayer name="🌊 Ocean">
            <TileLayer 
              url="https://server.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}"
              attribution="Esri &copy; Ocean Basemap"
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
              {reports.map((r) => (
                <Marker key={r.id} position={[r.lat, r.lng]}>
                  <Popup>
                    <div style={{ fontFamily: 'Arial, sans-serif' }}>
                      <h4 style={{ margin: '0 0 8px 0', color: '#DC2626' }}>
                        🚨 Incident Report
                      </h4>
                      <p><strong>Reporter:</strong> {r.user}</p>
                      <p><strong>Description:</strong> {r.desc}</p>
                      <p><strong>Location:</strong> {r.lat.toFixed(4)}, {r.lng.toFixed(4)}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </>
          </Overlay>
        </LayersControl>

        {/* User Location */}
        {coords && (
          <Marker position={coords}>
            <Popup>
              <div style={{ textAlign: 'center' }}>
                <h4 style={{ color: '#2563EB' }}>📍 Your Location</h4>
                <p>Latitude: {coords[0].toFixed(6)}</p>
                <p>Longitude: {coords[1].toFixed(6)}</p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Legend */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        backgroundColor: 'white',
        padding: '12px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        zIndex: 1000,
        fontSize: '12px',
        minWidth: '200px'
      }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#047857' }}>🌿 Mangrove Threat Levels</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '16px', 
              height: '16px', 
              backgroundColor: '#10B981', 
              borderRadius: '3px',
              border: '1px solid #047857'
            }}></div>
            <span>Low Risk</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '16px', 
              height: '16px', 
              backgroundColor: '#F59E0B', 
              borderRadius: '3px',
              border: '1px solid #047857'
            }}></div>
            <span>Medium Risk</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ 
              width: '16px', 
              height: '16px', 
              backgroundColor: '#EF4444', 
              borderRadius: '3px',
              border: '1px solid #047857'
            }}></div>
            <span>High Risk</span>
          </div>
        </div>
        <div style={{ 
          marginTop: '8px', 
          paddingTop: '8px', 
          borderTop: '1px solid #E5E7EB',
          fontSize: '10px',
          color: '#6B7280'
        }}>
          💡 Click polygons for details
        </div>
      </div>

      {/* Stats Panel */}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        backgroundColor: 'white',
        padding: '12px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        zIndex: 1000,
        fontSize: '12px',
        minWidth: '180px'
      }}>
        <h4 style={{ margin: '0 0 8px 0', color: '#047857' }}>📊 India Mangroves</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div><strong>Total Areas:</strong> {sampleMangrovePolygons.features.length}</div>
          <div><strong>Total Coverage:</strong> {sampleMangrovePolygons.features
            .reduce((sum, f) => sum + f.properties.area_hectares, 0)
            .toLocaleString()} ha</div>
          <div><strong>Reports:</strong> {reports.length}</div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedMangroveMap;