import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/global.css";

export default function AddAlert() {
  const [locations, setLocations] = useState([]);

  const [form, setForm] = useState({
    location_id: "",
    alert_type: "",
    severity_level: "",
    message: "",
    expiry_time: "",
  });

  // Load locations for dropdown
  useEffect(() => {
    axios.get("http://localhost:5000/locations").then((res) => {
      setLocations(res.data);
    });
  }, []);

  const save = async () => {
    await axios.post("http://localhost:5000/alerts", form);
    alert("Alert created successfully");
    window.location.reload();
  };

  return (
    <div className="card">
      <h2>Create Alert</h2>

      <select
        className="input"
        onChange={(e) => setForm({ ...form, location_id: e.target.value })}
      >
        <option>Select Location</option>
        {locations.map((loc) => (
          <option key={loc.location_id} value={loc.location_id}>
            {loc.city} ({loc.state})
          </option>
        ))}
      </select>

      <input
        className="input"
        placeholder="Alert Type (Warning/Emergency/Advisory)"
        onChange={(e) => setForm({ ...form, alert_type: e.target.value })}
      />

      <input
        className="input"
        placeholder="Severity Level (Low/Medium/High/Critical)"
        onChange={(e) => setForm({ ...form, severity_level: e.target.value })}
      />

      <textarea
        className="input"
        placeholder="Alert Message"
        rows={4}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
      ></textarea>

      <input
        className="input"
        type="datetime-local"
        onChange={(e) => setForm({ ...form, expiry_time: e.target.value })}
      />

      <button onClick={save}>Create Alert</button>
    </div>
  );
}
