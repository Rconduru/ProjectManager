import express from "express";
import ProjectDAO from "../dao";
import { IProject } from "../../../models/project.model";

const projectRouter = express.Router();

projectRouter.get("/projects", async (req, res) => {
  const dao = new ProjectDAO();
  try {
    const projects = await dao.getAll();
    res.status(200).send(projects);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: "error",
      message:
        "Desculpe, tivemos um problema interno. Estamos trabalhando para resolver.",
    });
  }
});

projectRouter.get("/projects/:id", (req, res) => {
  res.send("Get project by iddddddd");
});

projectRouter.post("/projects", async (req, res) => {
  const project: IProject = req.body;

  try {
    const dao = new ProjectDAO();
    const result = await dao.save(project);

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

projectRouter.put("/projects/:id", (req, res) => {
  res.send("Update project");
});

projectRouter.delete("/projects/:id", (req, res) => {
  res.send("Delete project");
});

export default projectRouter;
