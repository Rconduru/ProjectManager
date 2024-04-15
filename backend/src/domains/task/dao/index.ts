import { IDao } from "../../../models/dao.interface";
import { ITask } from "../../../models/task.interface";
import connectionPool from "../../../db";
import { IQuery } from "../../../models/query.interface";
import { DbException } from "../../../exceptions";
import { Pool } from "pg";

class TaskDAO implements IDao<ITask> {
  private pool: Pool;

  constructor() {
    this.pool = connectionPool;
  }

  public async get(id: number): Promise<ITask> {
    const query: IQuery = {
      text: "SELECT * FROM tasks WHERE id = $1",
      values: [id],
    };
    try {
      const result = await this.pool.query<ITask>(query);
      return result.rows[0];
    } catch (error) {
      throw new DbException(
        "Erro ao consultar tarefa com erro específico",
        "TaskDAO.get",
        error as Error
      );
    }
  }

  public async getAll(): Promise<ITask[]> {
    const query: IQuery = {
      text: "SELECT * FROM tasks",
      values: [],
    };
    try {
      const result = await this.pool.query<ITask>(query);
      return result.rows;
    } catch (error) {
      throw new DbException(
        "Erro ao consultar tarefas",
        "TaskDAO.getAll",
        error as Error
      );
    }
  }

  public async save(task: ITask): Promise<ITask> {
    const query: IQuery = {
      text: "INSERT INTO tasks (title, description, project_id, is_finished, ended_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      values: [
        task.title,
        task.description,
        task.projectId,
        false,
        task.endedAt,
      ],
    };
    try {
      const result = await this.pool.query<ITask>(query);
      return result.rows[0];
    } catch (error) {
      throw new DbException(
        "Erro ao inserir tarefa",
        "TaskDAO.save",
        error as Error
      );
    }
  }

  public async update(task: ITask): Promise<void> {
    const query: IQuery = {
      text: "UPDATE tasks SET title = $1, description = $2, is_finished = $3, ended_at = $4 WHERE id = $5 RETURNING *",
      values: [
        task.title,
        task.description,
        task.status,
        task.endedAt,
        task.id,
      ],
    };
    try {
      await this.pool.query<ITask>(query);
    } catch (error) {
      throw new DbException(
        "Erro ao atualizar tarefa",
        "TaskDAO.update",
        error as Error
      );
    }
  }

  public async delete(id: number): Promise<void> {
    const query: IQuery = {
      text: "DELETE FROM tasks WHERE id = $1",
      values: [id],
    };
    try {
      await this.pool.query<ITask>(query);
    } catch (error) {
      throw new DbException(
        "Erro ao deletar tarefa",
        "TaskDAO.delete",
        error as Error
      );
    }
  }
}

export default TaskDAO;
