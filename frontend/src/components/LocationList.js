import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/global.css";

export default function LocationList() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/locations").then((res) => {
      setLocations(res.data);
    });
  }, []);

  return (
    <div className="card">
      <h2>Saved Locations</h2>
      <div>
        {locations.length === 0 && <p>No locations found.</p>}
        {locations.map((loc) => (
          <div key={loc.location_id} className="list-item">
            <b>{loc.city}</b> — {loc.state}, {loc.country}
          </div>
        ))}
      </div>
    </div>
  );
}
