// server.js
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
app.use(express.json());

// =======================
// Comment out DB for now
// const mysql = require('mysql2');
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3306,
// });
// db.connect(err => {
//   if (err) {
//     console.error('DB connection failed:', err);
//   } else {
//     console.log('DB connected');
//   }
// });
// =======================

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running! DB is not connected yet.' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});






