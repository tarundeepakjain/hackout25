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
        type: "Feature",
        properties: {
          name: "Sundarbans Mangrove Complex",
          region: "India/Bangladesh",
          country: "India",
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
          region: "Odisha",
          country: "India",
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
          region: "Tamil Nadu",
          country: "India",
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

      // INDONESIA - Largest mangrove area globally
      {
        type: "Feature",
        properties: {
          name: "Borneo Mangroves",
          region: "Kalimantan",
          country: "Indonesia",
          area_hectares: 850000,
          conservation_status: "Mixed Protection",
          threat_level: "High",
          species_count: 180,
          description: "Largest mangrove complex in Indonesia, critically threatened by palm oil"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [109.0, -3.5], [117.0, -3.5], [117.0, 3.0], [109.0, 3.0], [109.0, -3.5]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Sumatra East Coast Mangroves",
          region: "Sumatra",
          country: "Indonesia",
          area_hectares: 680000,
          conservation_status: "Partially Protected",
          threat_level: "High",
          species_count: 165,
          description: "Critical tiger habitat, severely threatened by deforestation"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [98.0, 1.0], [106.0, 1.0], [106.0, 5.5], [98.0, 5.5], [98.0, 1.0]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Papua New Guinea Mangroves",
          region: "Papua",
          country: "Indonesia/PNG",
          area_hectares: 320000,
          conservation_status: "Limited Protection",
          threat_level: "Medium",
          species_count: 140,
          description: "Pristine mangrove systems with high biodiversity"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [140.0, -9.0], [150.0, -9.0], [150.0, -2.0], [140.0, -2.0], [140.0, -9.0]
          ]]
        }
      },

      // AUSTRALIA
      {
        type: "Feature",
        properties: {
          name: "Queensland Mangroves",
          region: "Queensland",
          country: "Australia",
          area_hectares: 580000,
          conservation_status: "Marine Parks",
          threat_level: "Low",
          species_count: 95,
          description: "Well-protected coastal mangroves along Great Barrier Reef"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [142.0, -24.0], [153.0, -24.0], [153.0, -10.0], [142.0, -10.0], [142.0, -24.0]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Kakadu Mangroves",
          region: "Northern Territory",
          country: "Australia",
          area_hectares: 45000,
          conservation_status: "UNESCO World Heritage",
          threat_level: "Low",
          species_count: 78,
          description: "Pristine mangroves in UNESCO World Heritage area"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [132.0, -13.0], [133.5, -13.0], [133.5, -12.0], [132.0, -12.0], [132.0, -13.0]
          ]]
        }
      },

      // AFRICA
      {
        type: "Feature",
        properties: {
          name: "Niger Delta Mangroves",
          region: "Niger Delta",
          country: "Nigeria",
          area_hectares: 260000,
          conservation_status: "Limited Protection",
          threat_level: "High",
          species_count: 85,
          description: "Largest mangrove ecosystem in Africa, threatened by oil pollution"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [3.0, 4.0], [8.5, 4.0], [8.5, 6.5], [3.0, 6.5], [3.0, 4.0]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Madagascar Mangroves",
          region: "Western Coast",
          country: "Madagascar",
          area_hectares: 158000,
          conservation_status: "Protected Areas",
          threat_level: "Medium",
          species_count: 92,
          description: "Diverse mangrove systems supporting local communities"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [43.2, -25.0], [44.5, -25.0], [44.5, -12.0], [43.2, -12.0], [43.2, -25.0]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Senegal Mangroves",
          region: "Casamance",
          country: "Senegal",
          area_hectares: 120000,
          conservation_status: "Ramsar Wetland",
          threat_level: "Medium",
          species_count: 67,
          description: "Important bird migration stopover and fishing grounds"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-17.0, 12.0], [-15.5, 12.0], [-15.5, 13.5], [-17.0, 13.5], [-17.0, 12.0]
          ]]
        }
      },

      // AMERICAS
      {
        type: "Feature",
        properties: {
          name: "Amazon Delta Mangroves",
          region: "Pará/Maranhão",
          country: "Brazil",
          area_hectares: 580000,
          conservation_status: "Multiple Reserves",
          threat_level: "High",
          species_count: 156,
          description: "Largest continuous mangrove belt in the world"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-51.0, -2.0], [-44.0, -2.0], [-44.0, 3.5], [-51.0, 3.5], [-51.0, -2.0]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Everglades Mangroves",
          region: "Florida",
          country: "United States",
          area_hectares: 230000,
          conservation_status: "National Park",
          threat_level: "Medium",
          species_count: 134,
          description: "Unique freshwater-saltwater transition ecosystem"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-81.8, 25.0], [-80.2, 25.0], [-80.2, 25.8], [-81.8, 25.8], [-81.8, 25.0]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Yucatan Mangroves",
          region: "Yucatan Peninsula",
          country: "Mexico",
          area_hectares: 180000,
          conservation_status: "Biosphere Reserve",
          threat_level: "Medium",
          species_count: 98,
          description: "Important nursery habitat for marine species"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-90.5, 19.5], [-87.0, 19.5], [-87.0, 21.6], [-90.5, 21.6], [-90.5, 19.5]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Colombian Pacific Mangroves",
          region: "Pacific Coast",
          country: "Colombia",
          area_hectares: 290000,
          conservation_status: "Regional Parks",
          threat_level: "High",
          species_count: 145,
          description: "High biodiversity mangroves threatened by development"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-78.2, 1.0], [-77.0, 1.0], [-77.0, 7.5], [-78.2, 7.5], [-78.2, 1.0]
          ]]
        }
      },

      // SOUTHEAST ASIA & PACIFIC
      {
        type: "Feature",
        properties: {
          name: "Mekong Delta Mangroves",
          region: "Mekong Delta",
          country: "Vietnam",
          area_hectares: 75000,
          conservation_status: "Biosphere Reserve",
          threat_level: "High",
          species_count: 112,
          description: "Critical shrimp farming region with mangrove restoration efforts"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [104.5, 8.5], [106.8, 8.5], [106.8, 10.8], [104.5, 10.8], [104.5, 8.5]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Malaysian Mangroves",
          region: "Peninsular Malaysia",
          country: "Malaysia",
          area_hectares: 565000,
          conservation_status: "Forest Reserves",
          threat_level: "High",
          species_count: 158,
          description: "Diverse mangrove systems under pressure from development"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [99.5, 1.0], [104.5, 1.0], [104.5, 6.5], [99.5, 6.5], [99.5, 1.0]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Philippines Mangroves",
          region: "Palawan/Mindanao",
          country: "Philippines",
          area_hectares: 250000,
          conservation_status: "Mixed Protection",
          threat_level: "High",
          species_count: 142,
          description: "Island archipelago mangroves supporting coastal communities"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [117.0, 5.0], [126.0, 5.0], [126.0, 11.0], [117.0, 11.0], [117.0, 5.0]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Thailand Mangroves",
          region: "Southern Thailand",
          country: "Thailand",
          area_hectares: 190000,
          conservation_status: "National Parks",
          threat_level: "Medium",
          species_count: 108,
          description: "Andaman Sea and Gulf of Thailand coastal mangroves"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [98.0, 6.0], [101.5, 6.0], [101.5, 14.0], [98.0, 14.0], [98.0, 6.0]
          ]]
        }
      },

      // MIDDLE EAST
      {
        type: "Feature",
        properties: {
          name: "Hara Mangroves",
          region: "Persian Gulf",
          country: "Iran",
          area_hectares: 85000,
          conservation_status: "Protected Area",
          threat_level: "Medium",
          species_count: 45,
          description: "Northernmost mangroves in the world, unique ecosystem"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [55.0, 25.5], [57.5, 25.5], [57.5, 27.5], [55.0, 27.5], [55.0, 25.5]
          ]]
        }
      },

      // CARIBBEAN
      {
        type: "Feature",
        properties: {
          name: "Bahamas Mangroves",
          region: "Andros Island",
          country: "Bahamas",
          area_hectares: 185000,
          conservation_status: "National Parks",
          threat_level: "Low",
          species_count: 78,
          description: "Pristine Caribbean mangrove ecosystem"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-78.5, 23.5], [-77.0, 23.5], [-77.0, 25.5], [-78.5, 25.5], [-78.5, 23.5]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Cuban Mangroves",
          region: "Zapata Peninsula",
          country: "Cuba",
          area_hectares: 421000,
          conservation_status: "Biosphere Reserve",
          threat_level: "Medium",
          species_count: 124,
          description: "Caribbean's largest mangrove ecosystem"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-82.5, 21.8], [-80.0, 21.8], [-80.0, 23.3], [-82.5, 23.3], [-82.5, 21.8]
          ]]
        }
      },

      // PACIFIC ISLANDS
      {
        type: "Feature",
        properties: {
          name: "Fiji Mangroves",
          region: "Viti Levu",
          country: "Fiji",
          area_hectares: 51500,
          conservation_status: "Marine Protected Areas",
          threat_level: "Medium",
          species_count: 89,
          description: "Island mangroves supporting coral reef ecosystems"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [177.0, -18.5], [179.0, -18.5], [179.0, -17.0], [177.0, -17.0], [177.0, -18.5]
          ]]
        }
      },

      // CENTRAL AMERICA
      {
        type: "Feature",
        properties: {
          name: "Costa Rica Mangroves",
          region: "Osa Peninsula",
          country: "Costa Rica",
          area_hectares: 42000,
          conservation_status: "National Parks",
          threat_level: "Low",
          species_count: 156,
          description: "Biodiverse Pacific coast mangroves"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-84.0, 8.3], [-83.0, 8.3], [-83.0, 9.0], [-84.0, 9.0], [-84.0, 8.3]
          ]]
        }
      },
      {
        type: "Feature",
        properties: {
          name: "Belize Mangroves",
          region: "Caribbean Coast",
          country: "Belize",
          area_hectares: 74000,
          conservation_status: "UNESCO World Heritage",
          threat_level: "Low",
          species_count: 98,
          description: "Barrier reef mangrove ecosystem"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-88.5, 15.5], [-87.5, 15.5], [-87.5, 18.5], [-88.5, 18.5], [-88.5, 15.5]
          ]]
        }
      },

      // SOUTH AMERICA - Additional
      {
        type: "Feature",
        properties: {
          name: "Orinoco Delta Mangroves",
          region: "Delta Amacuro",
          country: "Venezuela",
          area_hectares: 250000,
          conservation_status: "Biosphere Reserve",
          threat_level: "High",
          species_count: 118,
          description: "Large delta system with indigenous communities"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-62.5, 8.0], [-59.5, 8.0], [-59.5, 10.0], [-62.5, 10.0], [-62.5, 8.0]
          ]]
        }
      },

      // AFRICA - Additional
      {
        type: "Feature",
        properties: {
          name: "Gambia River Mangroves",
          region: "Gambia River",
          country: "Gambia",
          area_hectares: 68000,
          conservation_status: "Ramsar Site",
          threat_level: "Medium",
          species_count: 73,
          description: "West African river delta mangroves"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [-16.8, 13.0], [-13.8, 13.0], [-13.8, 13.8], [-16.8, 13.8], [-16.8, 13.0]
          ]]
        }
      },

      // RED SEA
      {
        type: "Feature",
        properties: {
          name: "Red Sea Mangroves",
          region: "Red Sea Coast",
          country: "Saudi Arabia",
          area_hectares: 13500,
          conservation_status: "Marine Protected Area",
          threat_level: "Medium",
          species_count: 28,
          description: "Arid climate mangroves adapted to high salinity"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[
            [36.0, 16.0], [40.0, 16.0], [40.0, 28.0], [36.0, 28.0], [36.0, 16.0]
          ]]
        }
      },
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
