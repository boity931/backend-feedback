// server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Load environment variables from Render automatically
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error('DB connection failed:', err);
    process.exit(1); // Stop server if DB fails
  } else {
    console.log('DB connected');
  }
});

// Test route to check backend and DB
app.get('/', (req, res) => {
  db.query('SELECT NOW() AS now', (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'DB query failed', details: err });
    }
    res.json({ message: 'Backend is running!', dbTime: results[0].now });
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = db; // Export DB connection for other modules





