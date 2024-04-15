import express from "express";
import cors from "cors";
import * as apiRoutes from "../routes";
import userRouter from "../domains/user/route";
import { authorization } from "../middlewares/authorization";
import { Router } from "express";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Project Manager working well!");
});

// Public routes
app.use(userRouter);

// Protected routes
const routeList: Router[] = [...Object.values(apiRoutes)];
for (const route of routeList) {
  app.use("/api/v1", authorization, route);
}

export default app;
