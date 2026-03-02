const express = require("express");
const router = express.Router();
const db = require("../db/conn");

// GET ALL LOCATIONS
router.get("/", (req, res) => {
  db.query("SELECT * FROM locations", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// ADD LOCATION
router.post("/", (req, res) => {
  const { city, state, country, latitude, longitude, timezone } = req.body;

  const sql = `INSERT INTO locations (city, state, country, latitude, longitude, timezone)
               VALUES (?, ?, ?, ?, ?, ?)`;

  db.query(sql, [city, state, country, latitude, longitude, timezone], (err) => {
    if (err) return res.json(err);
    res.json({ message: "Location added successfully" });
  });
});

module.exports = router;
