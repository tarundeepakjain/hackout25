import React, { useState } from 'react';
import { useMangroves } from '../hooks';

const DataManager = () => {
  const {
    mangroves,
    loading,
    error,
    saveMangroves,
    clearData,
    getStats,
    migrateToFirebase,
    totalMangroves,
    isEmpty
  } = useMangroves();

  const [stats, setStats] = useState(null);

  // 📄 Sample Indian mangrove data (you'll replace this with GMW data later)
  const sampleMangroveData = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {
          name: 'Sundarbans Mangroves',
          state: 'West Bengal',
          area_hectares: 426200,
          conservation_status: 'Protected',
          description: 'World\'s largest mangrove forest'
        },
        geometry: {
          type: 'Point',
          coordinates: [89.1833, 21.9497] // [lng, lat]
        }
      },
      {
        type: 'Feature',
        properties: {
          name: 'Pichavaram Mangroves',
          state: 'Tamil Nadu',
          area_hectares: 1100,
          conservation_status: 'Protected',
          description: 'Second largest mangrove forest in India'
        },
        geometry: {
          type: 'Point',
          coordinates: [79.7714, 11.4504]
        }
      },
      {
        type: 'Feature',
        properties: {
          name: 'Bhitarkanika Mangroves',
          state: 'Odisha',
          area_hectares: 67200,
          conservation_status: 'National Park',
          description: 'Important crocodile habitat'
        },
        geometry: {
          type: 'Point',
          coordinates: [86.9167, 20.7167]
        }
      },
      {
        type: 'Feature',
        properties: {
          name: 'Coringa Mangroves',
          state: 'Andhra Pradesh',
          area_hectares: 23500,
          conservation_status: 'Wildlife Sanctuary',
          description: 'Second largest stretch of mangrove forests in India'
        },
        geometry: {
          type: 'Point',
          coordinates: [82.2167, 16.75]
        }
      },
      {
        type: 'Feature',
        properties: {
          name: 'Muthupet Mangroves',
          state: 'Tamil Nadu',
          area_hectares: 6803,
          conservation_status: 'Protected',
          description: 'Important bird sanctuary'
        },
        geometry: {
          type: 'Point',
          coordinates: [79.5167, 10.4]
        }
      }
    ]
  };

  const handleLoadSampleData = async () => {
    const result = await saveMangroves(sampleMangroveData);
    if (result.success) {
      alert('✅ Sample mangrove data loaded successfully!');
    } else {
      alert('❌ Error loading data: ' + result.error);
    }
  };

  const handleClearData = async () => {
    if (confirm('Are you sure you want to clear all data?')) {
      await clearData();
      alert('🧹 Data cleared successfully!');
    }
  };

  const handleGetStats = async () => {
    const statsData = await getStats();
    setStats(statsData);
  };

  const handleMigrateToFirebase = async () => {
    if (confirm('Ready to migrate to Firebase? (Make sure authentication is set up first)')) {
      await migrateToFirebase();
      alert('🔥 Migrated to Firebase successfully!');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-green-800">🌿 Mangrove Data Manager</h2>
      
      {/* Status Section */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-green-800 mb-2">📊 Current Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Total Mangroves:</span>
            <span className="font-semibold ml-2 text-green-700">{totalMangroves}</span>
          </div>
          <div>
            <span className="text-gray-600">Storage:</span>
            <span className="font-semibold ml-2 text-blue-700">Local Storage</span>
          </div>
          <div>
            <span className="text-gray-600">Status:</span>
            <span className={`font-semibold ml-2 ${loading ? 'text-orange-600' : 'text-green-600'}`}>
              {loading ? 'Loading...' : 'Ready'}
            </span>
          </div>
        </div>
      </div>

      {/* Actions Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={handleLoadSampleData}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          📥 Load Sample Data
        </button>
        
        <button
          onClick={handleGetStats}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          📊 Get Statistics
        </button>
        
        <button
          onClick={handleClearData}
          disabled={loading}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          🧹 Clear All Data
        </button>
        
        <button
          onClick={handleMigrateToFirebase}
          disabled={loading}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
        >
          🔥 Migrate to Firebase
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-800">❌ Error: {error}</p>
        </div>
      )}

      {/* Statistics Display */}
      {stats && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">📈 Data Statistics</h3>
          <div className="space-y-2 text-sm">
            <p><span className="text-gray-600">Total Features:</span> <span className="font-semibold">{stats.totalFeatures}</span></p>
            <p><span className="text-gray-600">Storage Mode:</span> <span className="font-semibold">{stats.storageMode}</span></p>
            <p><span className="text-gray-600">States:</span> <span className="font-semibold">{stats.states.join(', ')}</span></p>
          </div>
        </div>
      )}

      {/* Data Preview */}
      {!isEmpty && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-800 mb-3">🗺️ Loaded Mangroves Preview</h3>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {mangroves.features.slice(0, 10).map((feature, index) => (
              <div key={index} className="bg-white p-3 rounded border text-sm">
                <div className="font-semibold text-green-700">{feature.properties.name}</div>
                <div className="text-gray-600">
                  {feature.properties.state} • {feature.properties.area_hectares?.toLocaleString()} hectares
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  📍 {feature.geometry.coordinates[1].toFixed(4)}, {feature.geometry.coordinates[0].toFixed(4)}
                </div>
              </div>
            ))}
            {mangroves.features.length > 10 && (
              <div className="text-center text-gray-500 text-sm py-2">
                ... and {mangroves.features.length - 10} more
              </div>
            )}
          </div>
        </div>
      )}

      {isEmpty && !loading && (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🌱</div>
          <p>No mangrove data loaded yet. Click "Load Sample Data" to get started!</p>
        </div>
      )}
    </div>
  );
};

export default DataManager;