import express from "express";
import cors from "cors";
import * as apiRoutes from "../routes";
import userRouter from "../domains/user/route";
import { isAuthenticated } from "../middlewares/authorization";
import { Router } from "express";
import path from "path";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
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
