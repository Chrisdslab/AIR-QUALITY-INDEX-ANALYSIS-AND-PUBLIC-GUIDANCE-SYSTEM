const express = require("express");
const router = express.Router();
const db = require("../db/conn");

// GET all users
router.get("/", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.json(err);
    res.json(result);
  });
});

// ADD USER (Signup)
router.post("/", (req, res) => {
  const { name, email, password, phone, user_type, location_id, health_profile } = req.body;

  const sql = `
    INSERT INTO users 
      (name, email, password, phone, user_type, location_id, health_profile, registration_date, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), 1)
  `;

  db.query(
    sql,
    [name, email, password, phone, user_type, location_id, health_profile],
    (err) => {
      if (err) return res.json(err);
      res.json({ message: "User added successfully" });
    }
  );
});

// LOGIN
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password],
    (err, result) => {
      if (err) return res.status(500).json(err);

      if (result.length === 0) {
        return res.json({ success: false, message: "Invalid email or password" });
      }

      res.json({
        success: true,
        user: result[0]
      });
    }
  );
});

module.exports = router;
