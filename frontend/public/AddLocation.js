import axios from "axios";
import { useState } from "react";
import "../styles/global.css";

export default function AddLocation() {
  const [form, setForm] = useState({
    city: "",
    state: "",
    country: "",
    latitude: "",
    longitude: "",
    timezone: ""
  });

  const save = async () => {
    try {
      await axios.post("http://localhost:5000/locations", form);
      alert("Location added");
      window.location.reload();
    } catch (err) {
      alert("Error saving location");
    }
  };

  return (
    <div className="card">
      <h2>Add Location</h2>
      <div className="input-grid">
        {Object.keys(form).map((key) => (
          <input
            key={key}
            placeholder={key}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            className="input"
          />
        ))}
      </div>
      <button onClick={save}>Save Location</button>
    </div>
  );
}
