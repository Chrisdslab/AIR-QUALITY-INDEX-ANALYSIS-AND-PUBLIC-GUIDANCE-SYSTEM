import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/global.css";

export default function AddWeather() {
  const [locations, setLocations] = useState([]);

  const [form, setForm] = useState({
    location_id: "",
    temperature: "",
    humidity: "",
    wind_speed: "",
    precipitation: "",
    wind_direction: ""
  });

  // Fetch locations for dropdown
  useEffect(() => {
    axios.get("http://localhost:5000/locations").then((res) => {
      setLocations(res.data);
    });
  }, []);

  const save = async () => {
    await axios.post("http://localhost:5000/weather", form);
    alert("Weather data added");
    window.location.reload();
  };

  return (
    <div className="card">
      <h2>Add Weather Data</h2>

      <select
        className="input"
        onChange={(e) => setForm({ ...form, location_id: e.target.value })}
      >
        <option>Select Location</option>
        {locations.map((loc) => (
          <option key={loc.location_id} value={loc.location_id}>
            {loc.city} - {loc.state}
          </option>
        ))}
      </select>

      <div className="input-grid">
        <input
          className="input"
          placeholder="Temperature (°C)"
          onChange={(e) => setForm({ ...form, temperature: e.target.value })}
        />

        <input
          className="input"
          placeholder="Humidity (%)"
          onChange={(e) => setForm({ ...form, humidity: e.target.value })}
        />

        <input
          className="input"
          placeholder="Wind Speed"
          onChange={(e) => setForm({ ...form, wind_speed: e.target.value })}
        />

        <input
          className="input"
          placeholder="Precipitation"
          onChange={(e) => setForm({ ...form, precipitation: e.target.value })}
        />

        <input
          className="input"
          placeholder="Wind Direction"
          onChange={(e) => setForm({ ...form, wind_direction: e.target.value })}
        />
      </div>

      <button onClick={save}>Save Weather Data</button>
    </div>
  );
}
