import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/global.css";

export default function StationList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/stations").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="card">
      <h2>Monitoring Stations</h2>

      {data.length === 0 && <p>No stations found.</p>}

      {data.map((s) => (
        <div className="list-item" key={s.station_id}>
          <b>{s.station_name}</b> — {s.station_code}<br />
          {s.latitude}, {s.longitude}<br />
          <span style={{ color: "gray" }}>
            {s.equipment_type} • {s.status}
          </span>
        </div>
      ))}
    </div>
  );
}
