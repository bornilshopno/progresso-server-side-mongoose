// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  photoURL: String,
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
