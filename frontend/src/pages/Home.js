import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/global.css";
import {
  LineChart, Line,
  BarChart, Bar,
  CartesianGrid,
  XAxis, YAxis,
  Tooltip, Legend
} from "recharts";


export default function Home() {
  const [aqiCount, setAqiCount] = useState(0);
  const [stationCount, setStationCount] = useState(0);
  const [locationCount, setLocationCount] = useState(0);

  const [latestAQI, setLatestAQI] = useState([]);
  const [recentAlerts, setRecentAlerts] = useState([]);
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/aqi").then((res) => {
      setAqiCount(res.data.length);
      setLatestAQI(res.data.slice(-5).reverse());
    });

    axios.get("http://localhost:5000/stations").then((res) => {
      setStationCount(res.data.length);
    });

    axios.get("http://localhost:5000/locations").then((res) => {
      setLocationCount(res.data.length);
    });

    axios.get("http://localhost:5000/alerts").then((res) => {
      setRecentAlerts(res.data.slice(-5).reverse());
    });

    axios.get("http://localhost:5000/weather").then((res) => {
      setWeather(res.data.slice(-1)); // show latest weather only
    });
  }, []);

  return (
    <>
      <h1>Dashboard</h1>

      {/* SUMMARY CARDS */}
      <div className="dash-grid">
        <div className="dash-card">
          <h2>{locationCount}</h2>
          <p>Locations Tracked</p>
        </div>

        <div className="dash-card">
          <h2>{stationCount}</h2>
          <p>Monitoring Stations</p>
        </div>

        <div className="dash-card">
          <h2>{aqiCount}</h2>
          <p>AQI Records Collected</p>
        </div>

        <div className="dash-card">
          <h2>{recentAlerts.length}</h2>
          <p>Active Alerts</p>
        </div>
      </div>

      {/* LATEST AQI DATA */}
      <div className="card">
        <h2>Latest AQI Readings</h2>

        {latestAQI.length === 0 && <p>No AQI data found.</p>}

        {latestAQI.map((a) => (
          <div key={a.data_id} className="list-item">
            <b>Station #{a.station_id}</b> — AQI {a.aqi_value} ({a.aqi_category})<br />
            PM2.5: {a.pm25} | PM10: {a.pm10} | CO: {a.co}<br />
            <span style={{ fontSize: "12px", color: "#777" }}>{a.timestamp}</span>
          </div>
        ))}
      </div>

      {/* RECENT ALERTS */}
      <div className="card">
        <h2>Recent Alerts</h2>

        {recentAlerts.length === 0 && <p>No alerts.</p>}

        {recentAlerts.map((al) => (
          <div key={al.alert_id} className="list-item">
            <b style={{ color: "red" }}>{al.alert_type}</b> — {al.severity_level}<br />
            {al.message}
            <br />
            <span style={{ fontSize: "12px", color: "#777" }}>
              Expires: {al.expiry_time}
            </span>
          </div>
        ))}
      </div>

      {/* WEATHER SNAPSHOT */}
      <div className="card">
        <h2>Latest Weather Snapshot</h2>

        {weather.length === 0 && <p>No weather data available.</p>}

        {weather.map((w) => (
          <div key={w.weather_id}>
            <b>Location #{w.location_id}</b><br />
            Temp: {w.temperature}°C • Humidity: {w.humidity}%<br />
            Wind: {w.wind_speed} km/h ({w.wind_direction})<br />
            Precipitation: {w.precipitation}<br />
            <span style={{ fontSize: "12px", color: "#777" }}>{w.timestamp}</span>
          </div>
        ))}
      </div>

      {/* AQI TREND CHART */}
<div className="card">
  <h2>AQI Trend (Last 7 Records)</h2>

  {latestAQI.length === 0 ? (
    <p>No AQI data to display.</p>
  ) : (
    <LineChart width={600} height={300} data={latestAQI}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="aqi_value" stroke="#1976d2" strokeWidth={2} />
    </LineChart>
  )}
</div>

{/* POLLUTANT CHART */}
<div className="card">
  <h2>Pollutant Levels</h2>

  {latestAQI.length === 0 ? (
    <p>No pollutant data available.</p>
  ) : (
    <BarChart width={600} height={320} data={latestAQI}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="timestamp" tick={{ fontSize: 10 }} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pm25" fill="#1e88e5" />
      <Bar dataKey="pm10" fill="#43a047" />
      <Bar dataKey="co" fill="#fb8c00" />
      <Bar dataKey="no2" fill="#e53935" />
      <Bar dataKey="so2" fill="#8e24aa" />
      <Bar dataKey="o3" fill="#00897b" />
    </BarChart>
  )}
</div>

    </>
  );
}
