const express = require("express");
const router = express.Router();
const db = require("../db/conn");

// GET all guidelines
router.get("/", (req, res) => {
  db.query("SELECT * FROM health_guidelines", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// ADD guideline
router.post("/", (req, res) => {
  const { min_aqi, max_aqi, aqi_category, health_impact, recommendations, sensitive_groups, color_code } = req.body;

  const sql = `INSERT INTO health_guidelines 
  (min_aqi, max_aqi, aqi_category, health_impact, recommendations, sensitive_groups, color_code)
   VALUES (?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [min_aqi, max_aqi, aqi_category, health_impact, recommendations, sensitive_groups, color_code],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "Health guideline added" });
    }
  );
});

module.exports = router;
