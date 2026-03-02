import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import LocationsPage from "./pages/LocationsPage";
import StationsPage from "./pages/StationsPage";
import AQIPage from "./pages/AQIPage";
import WeatherPage from "./pages/WeatherPage";
import AlertsPage from "./pages/AlertsPage";
import GuidelinesPage from "./pages/GuidelinesPage";
import UsersPage from "./pages/UsersPage";

import Login from "./components/Login";    // <-- Make sure this import stays

function App() {
  return (
    <Router>
      <Navbar />

      <div className="container">
        <Routes>

          {/* MAIN PAGES */}
          <Route path="/" element={<Home />} />
          <Route path="/locations" element={<LocationsPage />} />
          <Route path="/stations" element={<StationsPage />} />
          <Route path="/aqi" element={<AQIPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/guidelines" element={<GuidelinesPage />} />
          <Route path="/users" element={<UsersPage />} />

          {/* LOGIN PAGE */}
          <Route path="/login" element={<Login />} />

        </Routes>
      </div>

      <Footer />
    </Router>
  );
}

export default App;
