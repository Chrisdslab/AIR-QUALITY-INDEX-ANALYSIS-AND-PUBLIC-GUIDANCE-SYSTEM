const express = require("express");
const router = express.Router();
const db = require("../db/conn");

// GET AQI data
router.get("/", (req, res) => {
  db.query("SELECT * FROM aqi_data", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// ADD AQI data
router.post("/", (req, res) => {
  const {
    station_id,
    pm25,
    pm10,
    co,
    no2,
    so2,
    o3,
    aqi_value,
    aqi_category
  } = req.body;

  const sql = `INSERT INTO aqi_data 
  (station_id, timestamp, pm25, pm10, co, no2, so2, o3, aqi_value, aqi_category)
  VALUES (?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [station_id, pm25, pm10, co, no2, so2, o3, aqi_value, aqi_category],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "AQI data added" });
    }
  );
});

module.exports = router;
