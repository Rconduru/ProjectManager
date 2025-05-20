import express from "express";
import { v5 as uuidv5, NIL } from "uuid";
import UserDAO from "../dao";
import jwt from "jsonwebtoken";
import { toUserRole } from "../../../models/role.models";

const userRouter = express.Router();

userRouter.post("/auth/login", async (req, res) => {
  const { user, password } = req.body;
  const NAMESPACE = process.env.NAMESPACE || NIL;
  const AUTHSECRET = process.env.AUTHSECRET || "secret";

  const passwordV5 = uuidv5(password, NAMESPACE);

  try {
    const dao = new UserDAO();

    const userData = await dao.getByUserAndPassword(user, passwordV5);

    if (userData) {
      const token = jwt.sign({ userId: userData.id, role: toUserRole(userData.role) }, AUTHSECRET, {
        expiresIn: "7d",
      });

      return res.status(200).send({
        message: "Usuário logado com sucesso",
        access_token: token,
        tokne_type: "bearer",
        refresh_token: token,
        expires_in: 43177,
        scope: "password",
      });
    }

    return res.status(400).send({ message: "Usuário ou senha inválidos" });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: "error",
      message:
        "Desculpe, tivemos um problema interno. Estamos trabalhando para resolver.",
    });
  }
});

userRouter.post("/auth/register", async (req, res) => {
  const { user, password, role } = req.body;
  const NAMESPACE = process.env.NAMESPACE || NIL;

  const passwordV5 = uuidv5(password, NAMESPACE);

  try {
    const dao = new UserDAO();
    await dao.save({ username: user, password: passwordV5, role });

    res.status(200).send({ message: "Usuário cadastrado com sucesso" });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      status: "error",
      message:
        "Desculpe, não foi possível finalizar o cadastro. Verifique os dados e tente novamente.",
    });
  }
});

export default userRouter;
