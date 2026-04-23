import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import Task from "../models/tasks.js";


// ✅ GET tasks
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (error) {
    console.error("GET ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ CREATE
router.post("/", auth, async (req, res) => {
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
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ UPDATE
router.put("/:id", async (req, res) => {
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

export default router;