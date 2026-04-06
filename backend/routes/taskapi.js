const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

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

module.exports = router;