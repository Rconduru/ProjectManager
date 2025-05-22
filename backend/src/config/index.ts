import express, { Request, Response } from "express";
import cors from "cors";
import * as apiRoutes from "../routes";
import userRouter from "../domains/user/route";
import { isAuthenticated } from "../middlewares/authorization";
import { Router } from "express";
import path from "path";
import pinoHttp from "pino-http";
import logger from "./logger";

const app = express();

const pino = pinoHttp({
  logger,
});

app.use(pino);
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  req.log.info("Rota / acessada");
  res.sendFile(path.join(__dirname, '../template/index.html'));
});

// Public routes
app.use(userRouter);

// Protected routes
const routeList: Router[] = [...Object.values(apiRoutes)];
for (const route of routeList) {
  app.use("/api/v1", isAuthenticated, route);
}

export default app;
