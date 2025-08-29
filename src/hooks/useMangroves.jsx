// src/hooks/useMangroves.jsx
// 🎣 Custom React hook for mangrove data management

import { useState, useEffect, useCallback } from 'react';
import dataService from '../services/dataService.jsx';

export const useMangroves = (initialFilters = {}) => {
  const [mangroves, setMangroves] = useState({ features: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  // 📥 Load mangrove data
  const loadMangroves = useCallback(async (customFilters = {}) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await dataService.getMangroveData({ ...filters, ...customFilters });
      setMangroves(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading mangroves:', err);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  // 📍 Load mangroves by location
  const loadMangrovesByLocation = useCallback(async (lat, lng, radiusKm = 10) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await dataService.getMangrovesByLocation(lat, lng, radiusKm);
      setMangroves(data);
    } catch (err) {
      setError(err.message);
      console.error('Error loading mangroves by location:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // 💾 Save/Add new mangrove data
  const saveMangroves = useCallback(async (newData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Merge with existing data
      const currentData = await dataService.getMangroveData();
      const mergedData = {
        type: 'FeatureCollection',
        features: [...currentData.features, ...newData.features]
      };
      
      const result = await dataService.saveMangroveData(mergedData);
      if (result.success) {
        await loadMangroves(); // Refresh data
      }
      return result;
    } catch (err) {
      setError(err.message);
      console.error('Error saving mangroves:', err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [loadMangroves]);

  // 🔄 Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // 🧹 Clear all data
  const clearData = useCallback(async () => {
    try {
      await dataService.clearAllData();
      setMangroves({ features: [] });
    } catch (err) {
      setError(err.message);
    }
  }, []);

  // 📊 Get data statistics
  const getStats = useCallback(async () => {
    try {
      return await dataService.getDataStats();
    } catch (err) {
      setError(err.message);
      return null;
    }
  }, []);

  // 🔥 Migrate to Firebase (when ready)
  const migrateToFirebase = useCallback(async () => {
    setLoading(true);
    try {
      await dataService.migrateToFirebase();
      await loadMangroves(); // Reload from Firebase
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [loadMangroves]);

  // Load data on mount and when filters change
  useEffect(() => {
    loadMangroves();
  }, [loadMangroves]);

  return {
    // Data
    mangroves,
    loading,
    error,
    filters,
    
    // Actions
    loadMangroves,
    loadMangrovesByLocation,
    saveMangroves,
    updateFilters,
    clearData,
    getStats,
    migrateToFirebase,
    
    // Computed values
    totalMangroves: mangroves.features.length,
    isEmpty: mangroves.features.length === 0
  };
};