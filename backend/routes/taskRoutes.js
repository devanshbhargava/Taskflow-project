const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Task = require("../models/tasks");

router.get("/tasks", auth, async (req, res) => {
  const tasks = await Task.find({ user: req.user.id });
  res.json(tasks);
});

// CREATE
router.post("/tasks", auth, async (req, res) => {
  const task = new Task({
    ...req.body,
    user: req.user.id,
  });

  await task.save();
  res.json(task);
});

// DELETE
router.delete("/tasks/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

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
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;