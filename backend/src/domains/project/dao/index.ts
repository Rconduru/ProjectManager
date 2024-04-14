import { Pool } from "pg";

import { IDao } from "../../../models/dao.interface";
import { IProject } from "../../../models/project.model";

import connectionPool from "../../../db";
import { IQuery } from "../../../models/query.interface";
import { DbException } from "../../../exceptions";

class ProjectDAO implements IDao<IProject> {
  private pool: Pool;

  constructor() {
    this.pool = connectionPool;
  }

  public async get(id: number): Promise<IProject> {
    const query: IQuery = {
      text: "SELECT * FROM projects WHERE id = $1",
      values: [id],
    };
    try {
      const result = await this.pool.query<IProject>(query);
      return result.rows[0];
    } catch (error) {
      throw new DbException(
        "Erro ao consultar projeto com erro específico",
        "ProjectDAO.get",
        error as Error
      );
    }
  }

  public async getAll(): Promise<IProject[]> {
    const query: IQuery = {
      text: "SELECT * FROM projects",
      values: [],
    };

    try {
      const result = await this.pool.query<IProject>(query);
      return result.rows;
    } catch (error) {
      throw new DbException(
        "Erro ao consultar projetos",
        "ProjectDAO.getAll",
        error as Error
      );
    }
  }

  public async save(project: IProject): Promise<IProject> {
    const query: IQuery = {
      text: "INSERT INTO projects (title, description, started_at) VALUES ($1, $2, $3) RETURNING *",
      values: [project.title, project.description, new Date()],
    };
    try {
      const result = await this.pool.query<IProject>(query);
      return result.rows[0];
    } catch (error) {
      throw new DbException(
        "Erro ao inserir projeto",
        "ProjectDAO.save",
        error as Error
      );
    }
  }

  public async update(project: IProject): Promise<void> {
    const query: IQuery = {
      text: "UPDATE projects SET title = $1, description = $2 WHERE id = $3",
      values: [project.title, project.description, project.id],
    };

    try {
      await this.pool.query<IProject>(query);
    } catch (error) {
      throw new DbException(
        "Erro ao atualizar projeto",
        "ProjectDAO.update",
        error as Error
      );
    }
  }

  public async delete(id: number): Promise<void> {
    const query: IQuery = {
      text: "DELETE FROM projects WHERE id = $1",
      values: [id],
    };

    try {
      await this.pool.query<IProject>(query);
    } catch (error) {
      throw new DbException(
        "Erro ao deletar projeto",
        "ProjectDAO.delete",
        error as Error
      );
    }
  }

  public async saveSubProject(project: IProject): Promise<void> {
    const query: IQuery = {
      text: "INSERT INTO projects (title, description, started_at, project_id) VALUES ($1, $2, $3, $4) RETURNING *",
      values: [
        project.title,
        project.description,
        Date.now(),
        project.projectId,
      ],
    };
    try {
      await this.pool.query<IProject>(query);
    } catch (error) {
      throw new DbException(
        "Erro ao inserir subprojeto",
        "ProjectDAO.saveSubProject",
        error as Error
      );
    }
  }
}

export default ProjectDAO;
