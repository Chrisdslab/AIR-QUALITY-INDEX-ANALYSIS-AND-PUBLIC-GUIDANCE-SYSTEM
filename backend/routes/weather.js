const express = require("express");
const router = express.Router();
const db = require("../db/conn");

// GET all weather data
router.get("/", (req, res) => {
  db.query("SELECT * FROM weather_data", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// ADD weather record
router.post("/", (req, res) => {
  const { location_id, temperature, humidity, wind_speed, precipitation, wind_direction } = req.body;

  const sql = `INSERT INTO weather_data
   (location_id, timestamp, temperature, humidity, wind_speed, precipitation, wind_direction)
   VALUES (?, NOW(), ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [location_id, temperature, humidity, wind_speed, precipitation, wind_direction],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Weather data added" });
    }
  );
});

module.exports = router;
