import axios from "axios";
import { useState } from "react";
import "../styles/global.css";

export default function AddGuideline() {
  const [form, setForm] = useState({
    min_aqi: "",
    max_aqi: "",
    aqi_category: "",
    health_impact: "",
    recommendations: "",
    sensitive_groups: "",
    color_code: "",
  });

  const save = async () => {
    await axios.post("http://localhost:5000/guidelines", form);
    alert("Health Guideline added");
    window.location.reload();
  };

  return (
    <div className="card">
      <h2>Add Health Guideline</h2>

      <div className="input-grid">
        <input
          className="input"
          placeholder="Minimum AQI"
          onChange={(e) => setForm({ ...form, min_aqi: e.target.value })}
        />

        <input
          className="input"
          placeholder="Maximum AQI"
          onChange={(e) => setForm({ ...form, max_aqi: e.target.value })}
        />

        <input
          className="input"
          placeholder="AQI Category (Good/Moderate/Unhealthy)"
          onChange={(e) => setForm({ ...form, aqi_category: e.target.value })}
        />

        <input
          className="input"
          placeholder="Color Code (e.g., #00FF00)"
          onChange={(e) => setForm({ ...form, color_code: e.target.value })}
        />

        <input
          className="input"
          placeholder="Sensitive Groups"
          onChange={(e) => setForm({ ...form, sensitive_groups: e.target.value })}
        />
      </div>

      <textarea
        className="input"
        placeholder="Health Impact Description"
        rows={3}
        onChange={(e) => setForm({ ...form, health_impact: e.target.value })}
      ></textarea>

      <textarea
        className="input"
        placeholder="Recommendations"
        rows={3}
        onChange={(e) => setForm({ ...form, recommendations: e.target.value })}
      ></textarea>

      <button onClick={save}>Save Guideline</button>
    </div>
  );
}
