const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()
const app = express()
const connectdb = require("./config/db")
const taskRoutes = require("./routes/taskRoutes")
const authRoutes = require("./routes/authroutes")

connectdb()

app.use(cors({
  origin: "http://localhost:3000"
}));
app.use("/",require("./routes/taskapi"))
app.use(express.json())
app.use("/api/", taskRoutes)
app.use("/api/auth", authRoutes)

app.get("/",(req,res)=>{
    res.send("Task flow Api is running")
})
const PORT = process.env.PORT || 5000
app.listen(PORT,() => {
    console.log(`server is running on port ${PORT}`)
})
