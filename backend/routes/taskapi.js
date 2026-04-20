import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

let tasks = []; // temporary (later MongoDB)

router.get("/tasks", auth, (req, res) => {
  res.json(tasks);
});

router.post("/tasks", auth, (req, res) => {
  const newTask = {
    _id: Date.now(),
    title: req.body.title,
  };

  tasks.push(newTask);
  res.json(newTask);
});

export default router;