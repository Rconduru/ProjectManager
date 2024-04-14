import express from "express";

const taskRouter = express.Router();

taskRouter.get("/tasks", (req, res) => {
  res.send("Get All tasks");
});

taskRouter.get("/tasks/:id", (req, res) => {
  res.send("Get task by id");
});

taskRouter.post("/tasks", (req, res) => {
  res.send("Create task");
});

taskRouter.put("/tasks/:id", (req, res) => {
  res.send("Update task");
});

taskRouter.delete("/tasks/:id", (req, res) => {
  res.send("Delete task");
});

export default taskRouter;
