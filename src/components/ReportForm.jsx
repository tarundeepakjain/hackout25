import React, { useState } from "react";
import styles from "./ReportForm.module.css"; // import CSS module

function ReportForm() {
  const [photo, setPhoto] = useState(null);
  const [description, setDescription] = useState("");

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      alert("Please upload a photo!");
      return;
    }

    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("description", description);

    const res = await fetch("http://localhost:5000/api/reports", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      alert("Report submitted!");
      setDescription("");
      setPhoto(null);
    } else {
      alert("Error submitting report");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Report Mangrove Incident</h2>

      <label className={styles.label}>Upload Photo:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className={styles.input}
      />

      <label className={styles.label}>Description:</label>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={styles.textarea}
        placeholder="Describe what you observed..."
      />

      <button type="submit" className={styles.button}>
        Submit Report
      </button>
    </form>
  );
}

export default ReportForm;
