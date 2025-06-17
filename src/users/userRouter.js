// users/userRouter.js
import express from "express";
import { User } from "../models/User.js";

const userRouter = express.Router();

userRouter.post("/new-user", async (req, res) => {
  const userData = req.body;

  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      return res.send({ message: "Previously Registered User", insertedId: null });
    }

    const newUser = new User(userData);
    const result = await newUser.save();

    res.send({ message: "User created", insertedId: result._id });
  } catch (error) {
    console.error("User creation error:", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

export default userRouter;
