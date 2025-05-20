import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { JWTDecoded, JwtRequest } from "../models/user.model";
import { UserRole } from "../models/role.models";

export const authorization = (
  req: JwtRequest,
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

    const decoded = jwt.decode(token || "")
    if(decoded){
      req.user = decoded as JWTDecoded;
    }

    next();
  });

};

export const checkRole = (roles: UserRole[]) => {
  return (req: JwtRequest, res: Response, next: NextFunction) => {
    const userRole = req.user?.role;

    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).send({ message: "Acesso negado" });
    }

    next();
  };
}
