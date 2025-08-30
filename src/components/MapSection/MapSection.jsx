import React from 'react';
import MapView from '../MapView/MapView.jsx';
import './MapSection.css';

const MapSection = ({ reports, userCoords }) => {
  return (
    <div className="map-section">
      <div className="map-header">
        <h2>🌍 Interactive Mangrove Map</h2>
        <p>Explore India's mangrove forests and view reported environmental issues</p>
      </div>
      <div className="map">
        <MapView reports={reports} userCoords={userCoords} />
      </div>
    </div>
  );
};

export default MapSection;
