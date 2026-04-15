const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/tasks");

// ✅ GET tasks
router.get("/tasks", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error("GET ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ CREATE
router.post("/tasks", auth, async (req, res) => {
  try {
    const task = new Task({
      ...req.body,
      user: req.user.id,
    });

    await task.save();
    res.json(task);
  } catch (error) {
    console.error("POST ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ DELETE
router.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ UPDATE
router.put("/tasks/:id", async (req, res) => {
  try {
    const { title, completed } = req.body;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { title, completed },
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    console.error("PUT ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;