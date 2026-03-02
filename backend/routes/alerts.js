const express = require("express");
const router = express.Router();
const db = require("../db/conn");

// GET alerts
router.get("/", (req, res) => {
  db.query("SELECT * FROM alerts", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// ADD alert
router.post("/", (req, res) => {
  const { location_id, alert_type, severity_level, message, expiry_time } = req.body;

  const sql = `INSERT INTO alerts
    (location_id, alert_type, severity_level, message, created_at, expiry_time, is_active)
    VALUES (?, ?, ?, ?, NOW(), ?, 1)`;

  db.query(sql, [location_id, alert_type, severity_level, message, expiry_time], (err) => {
    if (err) return res.json(err);
    res.json({ message: "Alert created" });
  });
});

module.exports = router;