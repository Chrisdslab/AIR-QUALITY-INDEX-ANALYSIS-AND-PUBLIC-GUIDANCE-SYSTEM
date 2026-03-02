import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/global.css";

export default function AQIDataList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/aqi").then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="card">
      <h2>AQI Data Records</h2>

      {data.length === 0 && <p>No AQI records found.</p>}

      {data.map((aqi) => (
        <div key={aqi.data_id} className="list-item">
          <b>Station #{aqi.station_id}</b><br />
          PM2.5: {aqi.pm25} | PM10: {aqi.pm10}<br />
          CO: {aqi.co} | NO₂: {aqi.no2} | SO₂: {aqi.so2} | O₃: {aqi.o3}<br />
          <b>AQI:</b> {aqi.aqi_value} ({aqi.aqi_category})<br />
          <span style={{ fontSize: "12px", color: "#666" }}>
            {aqi.timestamp}
          </span>
        </div>
      ))}
    </div>
  );
}
