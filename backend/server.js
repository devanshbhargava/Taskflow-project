import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import connectdb from "./config/db.js";

import taskRoutes from "./routes/taskRoutes.js";
import authRoutes from "./routes/authroutes.js";



const app = express();

// ✅ Middleware (VERY IMPORTANT)

app.use(cors({
  origin: "https://taskflow-project-snowy.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());


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