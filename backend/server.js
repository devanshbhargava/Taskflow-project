const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const connectdb = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authroutes");

connectdb();

// ✅ Middleware FIRST
const allowedOrigins = [
  "http://localhost:3000",
  "https://taskflow-project-liard.vercel.app"
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  next();
});

// 🔥 VERY IMPORTANT (preflight)
app.options("*", (req, res) => {
  res.sendStatus(200);
});
// ✅ Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("TaskFlow API is running 🚀");
});

// ✅ Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});