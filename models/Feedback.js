const pool = require("../db");

const Feedback = {
  getAll: async () => {
    const [rows] = await pool.execute("SELECT * FROM Feedback");
    return rows;
  },

  create: async ({ studentName, courseCode, comments, rating }) => {
    const [result] = await pool.execute(
      "INSERT INTO Feedback (studentName, courseCode, comments, rating) VALUES (?, ?, ?, ?)",
      [studentName, courseCode, comments, rating]
    );
    return { id: result.insertId };
  },

  delete: async (id) => {
    const [result] = await pool.execute("DELETE FROM Feedback WHERE id = ?", [id]);
    return result.affectedRows;
  },
};

module.exports = Feedback;







