import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/global.css";

export default function AddStation() {
  const [locations, setLocations] = useState([]);

  const [form, setForm] = useState({
    location_id: "",
    station_name: "",
    station_code: "",
    latitude: "",
    longitude: "",
    equipment_type: "",
    status: ""
  });

  // Fetch available locations for dropdown
  useEffect(() => {
    axios.get("http://localhost:5000/locations").then((res) => {
      setLocations(res.data);
    });
  }, []);

  const save = async () => {
    await axios.post("http://localhost:5000/stations", form);
    alert("Station added");
    window.location.reload();
  };

  return (
    <div className="card">
      <h2>Add Monitoring Station</h2>

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

      <input className="input" placeholder="Station Name"
        onChange={(e) => setForm({ ...form, station_name: e.target.value })} />

      <input className="input" placeholder="Station Code"
        onChange={(e) => setForm({ ...form, station_code: e.target.value })} />

      <input className="input" placeholder="Latitude"
        onChange={(e) => setForm({ ...form, latitude: e.target.value })} />

      <input className="input" placeholder="Longitude"
        onChange={(e) => setForm({ ...form, longitude: e.target.value })} />

      <input className="input" placeholder="Equipment Type"
        onChange={(e) => setForm({ ...form, equipment_type: e.target.value })} />

      <input className="input" placeholder="Status (Active/Inactive/Maintenance)"
        onChange={(e) => setForm({ ...form, status: e.target.value })} />

      <button onClick={save}>Save Station</button>
    </div>
  );
}
