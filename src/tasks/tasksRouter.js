// tasks/tasksRouter.js
import express from "express";
import { Task } from "../models/Task.js";

const tasksRouter = express.Router();

// GET all tasks
tasksRouter.get("/", async (req, res) => {
  try {
    const allTasks = await Task.find();
    res.status(200).json(allTasks);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch tasks", error: error.message });
  }
});

// GET single task by ID
tasksRouter.get("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch task", error: error.message });
  }
});

// POST new task
tasksRouter.post("/add-task", async (req, res) => {
  try {
    const newTask = new Task({ ...req.body });
    const savedTask = await newTask.save();
    res.status(201).json({
      message: "Task created successfully",
      insertedId: savedTask._id,
      task: savedTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create task", error: error.message });
  }
});

// DELETE task
tasksRouter.delete("/delete/:id", async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({
      message: "Task deleted successfully",
      deletedId: deletedTask._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete task", error: error.message });
  }
});

// PUT update entire task
tasksRouter.put("/update-task/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: new Date() },
      { new: true, upsert: true }
    );
    res.status(200).json({
      message: "Task updated successfully",
      updatedId: updatedTask._id,
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task", error: error.message });
  }
});

// PUT update status on drag
tasksRouter.put("/dragged-task/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({
      message: "Task status updated successfully",
      updatedId: updatedTask._id,
      task: updatedTask,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update task status", error: error.message });
  }
});

export default tasksRouter;

