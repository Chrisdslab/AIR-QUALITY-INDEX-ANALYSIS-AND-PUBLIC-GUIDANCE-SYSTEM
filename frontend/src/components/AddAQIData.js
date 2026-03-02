import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/global.css";

export default function AddAQIData() {
  const [stations, setStations] = useState([]);

  const [form, setForm] = useState({
    station_id: "",
    pm25: "",
    pm10: "",
    co: "",
    no2: "",
    so2: "",
    o3: "",
    aqi_value: "",
    aqi_category: "",
  });

  // Fetch stations for dropdown
  useEffect(() => {
    axios.get("http://localhost:5000/stations").then((res) => {
      setStations(res.data);
    });
  }, []);

  const save = async () => {
    await axios.post("http://localhost:5000/aqi", form);
    alert("AQI data added");
    window.location.reload();
  };

  return (
    <div className="card">
      <h2>Add AQI Data</h2>

      <select
        className="input"
        onChange={(e) => setForm({ ...form, station_id: e.target.value })}
      >
        <option>Select Station</option>
        {stations.map((st) => (
          <option key={st.station_id} value={st.station_id}>
            {st.station_name}
          </option>
        ))}
      </select>

      <div className="input-grid">
        <input className="input" placeholder="PM2.5"
          onChange={(e) => setForm({ ...form, pm25: e.target.value })} />

        <input className="input" placeholder="PM10"
          onChange={(e) => setForm({ ...form, pm10: e.target.value })} />

        <input className="input" placeholder="CO"
          onChange={(e) => setForm({ ...form, co: e.target.value })} />

        <input className="input" placeholder="NO2"
          onChange={(e) => setForm({ ...form, no2: e.target.value })} />

        <input className="input" placeholder="SO2"
          onChange={(e) => setForm({ ...form, so2: e.target.value })} />

        <input className="input" placeholder="O3"
          onChange={(e) => setForm({ ...form, o3: e.target.value })} />

        <input className="input" placeholder="AQI Value"
          onChange={(e) => setForm({ ...form, aqi_value: e.target.value })} />

        <input className="input" placeholder="AQI Category"
          onChange={(e) => setForm({ ...form, aqi_category: e.target.value })} />
      </div>

      <button onClick={save}>Save AQI Data</button>
    </div>
  );
}
