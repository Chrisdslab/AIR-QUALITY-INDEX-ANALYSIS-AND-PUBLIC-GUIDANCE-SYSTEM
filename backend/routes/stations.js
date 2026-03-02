const express = require("express");
const router = express.Router();
const db = require("../db/conn");

// GET all monitoring stations
router.get("/", (req, res) => {
  db.query("SELECT * FROM monitoring_stations", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// ADD new station
router.post("/", (req, res) => {
  const { location_id, station_name, station_code, latitude, longitude, equipment_type, status } = req.body;

  const sql = `INSERT INTO monitoring_stations 
    (location_id, station_name, station_code, latitude, longitude, equipment_type, status, installation_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW())`;

  db.query(
    sql,
    [location_id, station_name, station_code, latitude, longitude, equipment_type, status],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Monitoring station added" });
    }
  );
});

module.exports = router;
