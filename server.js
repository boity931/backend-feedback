const express = require("express");
const cors = require("cors");
const feedbackRoutes = require("./routes/feedbackRoutes");
require("dotenv").config();
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/feedback", feedbackRoutes);

const PORT = process.env.PORT || 5000;

pool.getConnection()
  .then(() => {
    console.log("✅ Connected to MySQL database");
    app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error("❌ DB connection failed:", err));




