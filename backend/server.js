import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectdb from "./config/db.js";

import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

// ✅ Middleware (VERY IMPORTANT)
app.use(express.json());

app.use(cors({
  origin: "https://taskflow-project-liard.vercel.app",
  credentials: true
}));

// ✅ Connect DB
connectdb();

// ✅ Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("TaskFlow API is running 🚀");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});