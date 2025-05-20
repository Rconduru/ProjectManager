import { Request } from "express";
import { UserRole } from "./role.models";
import jwt from "jsonwebtoken";

export interface IUser {
  id?: number;
  username: string;
  password: string;
  role: UserRole;
  created_at?: Date;
  updated_at?: Date;
}

export interface JwtRequest extends Request {
 user?: {
  id: number;
  role: UserRole;
 };
}

export interface JWTDecoded extends jwt.JwtPayload {
  id: number;
  role: UserRole;
}
