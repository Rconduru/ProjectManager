import { Request, Response } from "express";
import ProjectDAO from "../dao";
import { IProject } from "../../../models/project.model";
import { StatusCode } from "../../../models/statusCode";

export const getAllProjects = async (req: Request, res: Response) => {
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
};

export const getProjectById = async (id: number) => {
  const dao = new ProjectDAO();
  const result = await dao.get(id);
  return result;
};

export const saveProject = async (req: Request, res: Response) => {
  const project: IProject = req.body;

  try {
    const dao = new ProjectDAO();
    const result = await dao.save(project);

    res.status(StatusCode.CREATED).send(result);
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: "error",
      message:
        "Desculpe, tivemos um problema interno. Estamos trabalhando para resolver.",
    });
  }
};

export const saveSubProject = async (req: Request, res: Response) => {

  const projectId = req.params.id;
  const project: IProject = req.body;
  project.id = Number(projectId);

  try {
    const dao = new ProjectDAO();
    const result = await dao.saveSubProject(project);

    res.status(StatusCode.CREATED).send(result);
  } catch (error) {
    res.status(500).send({
      status: "error",
      message:
        "Desculpe, tivemos um problema interno. Estamos trabalhando para resolver.",
    });
  }
}