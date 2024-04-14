import { Pool } from "pg";
import { IUser } from "../../../models/user.model";
import { IDao } from "../../../models/dao.interface";

import connectionPool from "../../../db";
import { DbException } from "../../../exceptions";

class UserDAO {
  private pool: Pool;

  constructor() {
    this.pool = connectionPool;
  }

  public async save(user: IUser): Promise<IUser> {
    const query = {
      text: "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
      values: [user.username, user.password],
    };
    try {
      const result = await this.pool.query<IUser>(query);
      return result.rows[0];
    } catch (error) {
      throw new DbException(
        "Erro ao salvar usuário",
        "UserDAO.save",
        error as Error
      );
    }
  }

  public async getByUserAndPassword(
    user: string,
    password: string
  ): Promise<IUser> {
    const query = {
      text: "SELECT * FROM users WHERE username = $1 and password = $2",
      values: [user, password],
    };
    try {
      const result = await this.pool.query<IUser>(query);
      return result.rows[0];
    } catch (error) {
      throw new DbException(
        "Erro ao consultar usuário por id",
        "UserDAO.get",
        error as Error
      );
    }
  }

  public async update(user: IUser): Promise<void> {
    const query = {
      text: "UPDATE users SET username = $1, password = $2 WHERE id = $3",
      values: [user.username, user.password, user.id],
    };
    try {
      await this.pool.query<IUser>(query);
    } catch (error) {
      throw new DbException(
        "Erro ao atualizar usuário",
        "UserDAO.update",
        error as Error
      );
    }
  }
}

export default UserDAO;
