import express from "express";
import { ITask, ITaskRequest } from "../../../models/task.interface";
import TaskDAO from "../dao";

const taskRouter = express.Router();

taskRouter.get("/tasks", (req, res) => {
  res.send("Get All tasks");
});

taskRouter.get("/tasks/:id", (req, res) => {
  res.send("Get task by id");
});

taskRouter.post("/tasks", async (req, res) => {
  const task: ITaskRequest = req.body;
  const inputTask: ITask = {
    title: task.title,
    description: task.description,
    status: "open",
    projectId: task.projectId,
    endedAt: new Date(task.endedAt),
  };

  try {
    const dao = new TaskDAO();
    const result = await dao.save(inputTask);

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: "error",
      message:
        "Desculpe, tivemos um problema interno. Estamos trabalhando para resolver.",
    });
  }
});

taskRouter.put("/tasks/:id", (req, res) => {
  res.send("Update task");
});

taskRouter.delete("/tasks/:id", (req, res) => {
  res.send("Delete task");
});

export default taskRouter;
