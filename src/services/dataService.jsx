// src/services/dataService.jsx
// 🔥 Firebase-ready data service - currently using local storage

class DataService {
  constructor() {
    this.isFirebaseMode = false; // Switch this to true when Firebase is ready
    this.localStorageKey = 'mangrove_data';
  }

  // 🗺️ MANGROVE DATA METHODS
  async getMangroveData(filters = {}) {
    if (this.isFirebaseMode) {
      return this._getFirebaseMangroves(filters);
    }
    return this._getLocalMangroves(filters);
  }

  async saveMangroveData(data) {
    if (this.isFirebaseMode) {
      return this._saveFirebaseMangroves(data);
    }
    return this._saveLocalMangroves(data);
  }

  async getMangrovesByLocation(lat, lng, radiusKm = 10) {
    if (this.isFirebaseMode) {
      return this._getFirebaseMangrovesByLocation(lat, lng, radiusKm);
    }
    return this._getLocalMangrovesByLocation(lat, lng, radiusKm);
  }

  // 📍 LOCAL STORAGE METHODS (Current Implementation)
  _getLocalMangroves(filters = {}) {
    try {
      const stored = localStorage.getItem(this.localStorageKey);
      let data = stored ? JSON.parse(stored) : { features: [] };
      
      // Apply filters if provided
      if (filters.state) {
        data.features = data.features.filter(feature => 
          feature.properties?.state?.toLowerCase().includes(filters.state.toLowerCase())
        );
      }
      
      return Promise.resolve(data);
    } catch (error) {
      console.error('Error getting local mangroves:', error);
      return Promise.resolve({ features: [] });
    }
  }

  _saveLocalMangroves(data) {
    try {
      localStorage.setItem(this.localStorageKey, JSON.stringify(data));
      return Promise.resolve({ success: true });
    } catch (error) {
      console.error('Error saving local mangroves:', error);
      return Promise.resolve({ success: false, error });
    }
  }

  _getLocalMangrovesByLocation(lat, lng, radiusKm) {
    return this._getLocalMangroves().then(data => {
      // Simple distance filtering (you can improve this with proper geospatial calculations)
      const filtered = data.features.filter(feature => {
        if (feature.geometry.type === 'Point') {
          const [fLng, fLat] = feature.geometry.coordinates;
          const distance = this._calculateDistance(lat, lng, fLat, fLng);
          return distance <= radiusKm;
        }
        return true; // Include polygons for now
      });
      
      return { ...data, features: filtered };
    });
  }

  // 🔥 FIREBASE METHODS (Ready for future implementation)
  async _getFirebaseMangroves(filters = {}) {
    // TODO: Implement when Firebase is ready
    // const db = getFirestore();
    // let query = collection(db, 'mangroves');
    // 
    // if (filters.state) {
    //   query = query.where('state', '==', filters.state);
    // }
    // 
    // const snapshot = await getDocs(query);
    // return this._formatFirestoreData(snapshot);
    
    console.log('Firebase mode not implemented yet');
    return { features: [] };
  }

  async _saveFirebaseMangroves(data) {
    // TODO: Implement when Firebase is ready
    // const db = getFirestore();
    // const batch = writeBatch(db);
    // 
    // data.features.forEach((feature, index) => {
    //   const docRef = doc(db, 'mangroves', `mangrove_${index}`);
    //   batch.set(docRef, {
    //     ...feature.properties,
    //     geometry: feature.geometry,
    //     location: new GeoPoint(
    //       feature.geometry.coordinates[1], 
    //       feature.geometry.coordinates[0]
    //     )
    //   });
    // });
    // 
    // await batch.commit();
    
    console.log('Firebase save mode not implemented yet');
    return { success: false };
  }

  async _getFirebaseMangrovesByLocation(lat, lng, radiusKm) {
    // TODO: Implement with Firebase geospatial queries
    // const db = getFirestore();
    // const center = new GeoPoint(lat, lng);
    // const radiusInM = radiusKm * 1000;
    // 
    // // Firebase geohash or third-party library for radius queries
    
    console.log('Firebase location query not implemented yet');
    return { features: [] };
  }

  // 🛠️ UTILITY METHODS
  _calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = this._deg2rad(lat2 - lat1);
    const dLon = this._deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this._deg2rad(lat1)) * Math.cos(this._deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  _deg2rad(deg) {
    return deg * (Math.PI/180);
  }

  _formatFirestoreData(snapshot) {
    const features = [];
    snapshot.forEach(doc => {
      const data = doc.data();
      features.push({
        type: 'Feature',
        properties: data,
        geometry: data.geometry
      });
    });
    return {
      type: 'FeatureCollection',
      features
    };
  }

  // 🔄 MIGRATION METHOD (When switching to Firebase)
  async migrateToFirebase() {
    if (this.isFirebaseMode) {
      console.log('Already in Firebase mode');
      return;
    }

    const localData = await this._getLocalMangroves();
    if (localData.features.length > 0) {
      await this._saveFirebaseMangroves(localData);
      console.log('Data migrated to Firebase successfully');
    }

    this.isFirebaseMode = true;
  }

  // 📊 DATA MANAGEMENT
  async clearAllData() {
    if (this.isFirebaseMode) {
      // TODO: Clear Firebase collection
      console.log('Firebase clear not implemented');
    } else {
      localStorage.removeItem(this.localStorageKey);
    }
  }

  async getDataStats() {
    const data = await this.getMangroveData();
    return {
      totalFeatures: data.features.length,
      states: [...new Set(data.features.map(f => f.properties?.state).filter(Boolean))],
      storageMode: this.isFirebaseMode ? 'Firebase' : 'Local Storage'
    };
  }
}

// Export singleton instance
export default new DataService();