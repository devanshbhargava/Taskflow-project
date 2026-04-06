const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  deadline: {
    type: Date, 
  },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High"],
    default: "Medium",
  },
  assignedTo: {
    type: String, // name/email of member
  },
  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
}
}, {
  timestamps: true 
});

module.exports = mongoose.model("Task", taskSchema);