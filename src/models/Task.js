import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  priority: String,
  status: { type: String, default: "to-do" },
  dueDate: String,
  createdBy: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

export const Task = mongoose.model("Task", taskSchema);
