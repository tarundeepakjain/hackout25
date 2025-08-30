import React from 'react';
import './Header.css';

const Header = ({ showDataManager, onToggleDataManager }) => {
  return (
    <div className="header">
      {/* 🌿 Data Manager Toggle Button */}
      <div className="data-manager-toggle">
        <button
          onClick={onToggleDataManager}
          className={`toggle-btn ${showDataManager ? 'active' : ''}`}
          title={showDataManager ? 'Close Mangrove Data' : 'Open Mangrove Data Manager'}
        >
          {showDataManager ? '❌ Close' : '🌿 Mangrove Data'}
        </button>
      </div>
    </div>
  );
};

export default Header;
