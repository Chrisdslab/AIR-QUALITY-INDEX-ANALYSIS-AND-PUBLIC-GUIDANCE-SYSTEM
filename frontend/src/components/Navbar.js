import "../styles/global.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-title">AQI Monitoring System</div>

      <div className="nav-links">
        <a href="/login">Login</a>

        <a href="/">Home</a>
        <a href="/locations">Locations</a>
        <a href="/stations">Stations</a>
        <a href="/aqi">AQI Data</a>
        <a href="/weather">Weather</a>
        <a href="/alerts">Alerts</a>
        <a href="/guidelines">Guidelines</a>
        <a href="/users">Users</a>
      </div>
    </nav>
  );
}
