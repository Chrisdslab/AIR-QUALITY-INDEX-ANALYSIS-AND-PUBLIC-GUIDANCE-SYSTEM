import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/global.css";

export default function AlertList() {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/alerts").then((res) => {
      setAlerts(res.data);
    });
  }, []);

  const severityColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "red";
      case "medium":
        return "orange";
      case "low":
        return "green";
      case "critical":
        return "darkred";
      default:
        return "gray";
    }
  };

  return (
    <div className="card">
      <h2>Active Alerts</h2>

      {alerts.length === 0 && <p>No active alerts found.</p>}

      {alerts.map((a) => (
        <div key={a.alert_id} className="list-item">
          <b style={{ color: severityColor(a.severity_level) }}>
            {a.alert_type} — {a.severity_level}
          </b>
          <br />
          {a.message}
          <br />
          <span style={{ fontSize: "12px", color: "#666" }}>
            Expires: {a.expiry_time}
          </span>
        </div>
      ))}
    </div>
  );
}
