const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// ROUTES
app.use("/users", require("./routes/users"));
app.use("/locations", require("./routes/locations"));
app.use("/stations", require("./routes/stations"));
app.use("/aqi", require("./routes/aqi"));
app.use("/weather", require("./routes/weather"));
app.use("/alerts", require("./routes/alerts"));
app.use("/guidelines", require("./routes/guidelines"));

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
