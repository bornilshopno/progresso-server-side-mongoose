import express from "express";
import cors from "cors";
import tasksRouter from "./tasks/tasksRouter.js";
import userRouter from "./users/userRouter.js";

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://progresso-board.netlify.app']  
}));
app.use(express.json());

app.use("/tasks", tasksRouter);
app.use("/users", userRouter);

//Root route handler
app.get("/", (req, res) => {
  res.send("Thanks for visiting progresso backend server");
});

//404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Requested Route Not Found" });
});

//Global error handler
app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    message: "Something went wrong from global error handler",
    error: error.message || error,
  });
});

export default app;
