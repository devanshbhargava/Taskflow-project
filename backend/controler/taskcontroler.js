import Task from "../models/tasks.js"; 

// CREATE TASK
const createtask = async (req, res) => {
  try {
    const { title } = req.body;

    const taske = await Task.create({
      title,
      user: req.user?.id // optional (if auth middleware)
    });

    res.status(201).json(taske);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET ALL TASKS
const getalltask = async (req, res) => {
  try {
    const tasks = await Task.find(); // later: filter by user

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const deletetask = async (req, res) => {
  try {
    const { id } = req.params;

    await Task.findByIdAndDelete(id);

    res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// UPDATE TASK
const updatetask = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    ); // ✅ FIXED

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


export default {
  createtask,
  getalltask,
  deletetask,
  updatetask
};