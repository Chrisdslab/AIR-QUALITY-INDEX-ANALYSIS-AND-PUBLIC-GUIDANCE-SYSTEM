import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/global.css";

export default function WeatherList() {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/weather").then((res) => {
      setWeather(res.data);
    });
  }, []);

  return (
    <div className="card">
      <h2>Weather Records</h2>

      {weather.length === 0 && <p>No weather data available.</p>}

      {weather.map((w) => (
        <div key={w.weather_id} className="list-item">
          <b>Location #{w.location_id}</b><br />
          Temp: {w.temperature}°C • Humidity: {w.humidity}%<br />
          Wind: {w.wind_speed} km/h ({w.wind_direction})<br />
          Precipitation: {w.precipitation}<br />
          <span style={{ fontSize: "12px", color: "#666" }}>
            {w.timestamp}
          </span>
        </div>
      ))}
    </div>
  );
}
