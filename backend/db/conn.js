const mysql = require("mysql2");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Admin@12", 
  database: "aqi_system",
  connectionLimit: 10,
});

module.exports = db;
