const express = require("express");
const router = express.Router();
const Feedback = require("../models/Feedback");

// GET all feedback
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.getAll();
    res.json(feedbacks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST feedback
router.post("/", async (req, res) => {
  try {
    const newFeedback = await Feedback.create(req.body);
    res.status(201).json({ id: newFeedback.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// DELETE feedback
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Feedback.delete(req.params.id);
    if (deleted) res.json({ message: "Deleted successfully" });
    else res.status(404).json({ error: "Feedback not found" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;



