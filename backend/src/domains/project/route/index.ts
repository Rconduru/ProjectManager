import express from "express";
import ProjectDAO from "../dao";
import { validateInputData, validateOwner } from "../../../middlewares/validation";
import { ProjectSaveSchema } from "../../../schemas/project.schema"
import { getAllProjects, getProjectById, saveProject, saveSubProject } from "../controller";
import { isAuthorizated } from "../../../middlewares/authorization";
import { UserRole } from "../../../models/role.models";
import { IProject } from "../../../models/project.model";

const projectRouter = express.Router();

projectRouter.get("/projects", getAllProjects);
projectRouter.get("/projects/:id", validateOwner<IProject>(new ProjectDAO()), getProjectById);

projectRouter.post("/projects",
  isAuthorizated([UserRole.ADMIN, UserRole.EDITOR]), 
  validateInputData(ProjectSaveSchema),
  saveProject);

projectRouter.post("/projects/:id/subproject",
  isAuthorizated([UserRole.ADMIN, UserRole.EDITOR]),
  validateInputData(ProjectSaveSchema), 
  saveSubProject);

projectRouter.put("/projects/:id", (req, res) => {
  res.send("Update project");
});

projectRouter.delete("/projects/:id", (req, res) => {
  res.send("Delete project");
});

projectRouter.get("/projects/tasks", async (req, res) => {
  try {
    const dao = new ProjectDAO();
    const result = await dao.getProjectsWithTasks();

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

projectRouter.get("/projects/count", async (req, res) => {
  try {
    const dao = new ProjectDAO();
    const result = await dao.getProjectCount();
    res.status(200).send({ count: result });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: "error",
      message:
        "Desculpe, tivemos um problema interno. Estamos trabalhando para resolver.",
    });
  }
});

export default projectRouter;
