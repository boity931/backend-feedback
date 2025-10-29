require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// =======================
// Database Connection
// =======================
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

db.connect(err => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Database connected successfully!');
  }
});

// =======================
// Test route
// =======================
app.get('/', (req, res) => {
  res.json({ message: 'Backend and DB connection successful!' });
});

// =======================
// Start server
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});





