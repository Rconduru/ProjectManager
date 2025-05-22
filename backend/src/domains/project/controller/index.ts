import { Request, Response } from "express";
import ProjectDAO from "../dao";
import { IProject } from "../../../models/project.model";
import { StatusCode } from "../../../models/statusCode";
import { JwtRequest } from "../../../models/user.model";

export const getAllProjects = async (req: Request, res: Response) => {
  req.log.info("## Get all projects");
  const dao = new ProjectDAO();
  try {
    const projects = await dao.getAll();
    res.status(200).send(projects);
  } catch (error) {
    req.log.error("## ERROR - Get all projects", error);

    res.status(500).send({
      status: "error",
      message:
        "Desculpe, tivemos um problema interno. Estamos trabalhando para resolver.",
    });
  }
};

export const getProjectById = async (req: Request, res: Response) => {
  
  const projectId = req.params.id;
  const dao = new ProjectDAO();
  try {
    const result = await dao.get(Number(projectId));
    
    if (!result) {
      return res.status(StatusCode.NOT_FOUND).send({
        status: 404,
        message: "Projeto não encontrado",
      });
    }

    res.status(StatusCode.OK).send(result);
  } catch (error) {
    res.status(500).send({
      status: 500,
      message:
        "Desculpe, tivemos um problema interno. Estamos trabalhando para resolver.",
    });
  }
};

export const saveProject = async (req: JwtRequest, res: Response) => {
  const userId = req.user?.id;
  const project: IProject = req.body;
  project.createdBy = userId as number;

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

export const saveSubProject = async (req: JwtRequest, res: Response) => {

  const projectId = req.params.id;
  const userId = req.user?.id;

  const project: IProject = req.body;
  project.projectId = Number(projectId);
  project.createdBy = userId as number;

  try {
    const dao = new ProjectDAO();
    const result = await dao.saveSubProject(project);

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

export const updateProject = async (req: Request, res: Response) => {
  const projectId = req.params.id;
  const project: IProject = req.body;
  project.id = Number(projectId);

  try {
    const dao = new ProjectDAO();
    await dao.update(project);

    res.status(StatusCode.OK).send(project);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "error",
      message:
        "Desculpe, tivemos um problema interno. Estamos trabalhando para resolver.",
    });
  }
};