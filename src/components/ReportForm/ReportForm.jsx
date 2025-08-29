import React, { useState } from 'react';

const ReportForm = ({ coords, onSubmit }) => {
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!coords) {
      alert("📍 Please enable location access to report incidents");
      return;
    }

    const newReport = {
      id: Date.now(),
      desc: desc.trim(),
      lat: coords[0],
      lng: coords[1],
      user: "User1",
      timestamp: new Date().toISOString(),
    };

    // Call the parent component's onSubmit handler
    onSubmit(newReport);

    // Clear form
    setDesc("");
    setFile(null);
    
    // Success feedback
    alert("✅ Incident reported successfully! +10 points earned");
  };

  return (
    <div className="card">
      <h2 className="card-title">
        🚨 Report Environmental Issue
      </h2>
      <form onSubmit={handleSubmit} className="report-form">
        <div className="form-group">
          <label htmlFor="description">📝 Describe the issue:</label>
          <textarea
            id="description"
            placeholder="Describe the environmental issue you've observed (e.g., mangrove deforestation, pollution, illegal activities)..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
            className="form-textarea"
            rows={4}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="evidence">📸 Upload Evidence (Optional):</label>
          <input
            id="evidence"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept="image/*,video/*"
            className="form-file"
          />
          <small className="form-help">
            Upload photos or videos as evidence of the environmental issue
          </small>
        </div>

        {coords && (
          <div className="location-info">
            <p>📍 <strong>Your Location:</strong> {coords[0].toFixed(4)}, {coords[1].toFixed(4)}</p>
            <small>Location will be automatically attached to your report</small>
          </div>
        )}

        <button 
          type="submit" 
          className="submit-btn"
          disabled={!desc.trim() || !coords}
        >
          📤 Submit Report
        </button>
      </form>
    </div>
  );
};

export default ReportForm;