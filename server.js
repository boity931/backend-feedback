require('dotenv').config(); // Load environment variables
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const PORT = process.env.PORT || 10000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://feedback-fronted-2.onrender.com';

const app = express();

// =======================
// Middleware
// =======================
app.use(cors({
  origin: FRONTEND_URL,
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// =======================
// Database Connection Pool
// =======================
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

db.getConnection((err, connection) => {
  if (err) {
    console.error('❌ Database connection failed:', err.message);
  } else {
    console.log('✅ Database pool connected successfully!');
    connection.release();
  }
});

// =======================
// Routes
// =======================

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is running and DB is connected!' });
});

// Add feedback
app.post('/add', (req, res) => {
  const { studentName, courseCode, comments, rating } = req.body;

  if (!studentName || !comments || !courseCode || !rating) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  const sql = 'INSERT INTO feedback_table (studentName, courseCode, comments, rating) VALUES (?, ?, ?, ?)';
  db.query(sql, [studentName, courseCode, comments, rating], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Feedback added!', id: result.insertId });
  });
});

// Get all feedback
app.get('/feedback', (req, res) => {
  const sql = 'SELECT * FROM feedback_table';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Delete feedback by id
app.delete('/feedback/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM feedback_table WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Feedback not found' });
    res.json({ message: 'Feedback deleted successfully!' });
  });
});

// =======================
// Start server
// =======================
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});








