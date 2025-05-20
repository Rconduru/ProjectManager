import { Request, Response } from "express";
import TaskDAO from "../dao";
import { ITask, ITaskRequest } from "../../../models/task.interface";

export const saveTask = async (req: Request, res: Response) => {

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
};