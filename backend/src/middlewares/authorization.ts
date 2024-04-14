import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers["authorization"];
  token = token?.replace("Bearer ", "");
  const AUTHSECRET = process.env.AUTHSECRET || "secret";

  if (!token) {
    return res.status(401).send({ message: "Token não informado" });
  }

  jwt.verify(token, AUTHSECRET, (error) => {
    if (error) {
      return res.status(401).send({ message: "Token inválido" });
    }

    next();
  });

  return;
};
