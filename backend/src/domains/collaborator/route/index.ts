import express from "express";

const collaboratorRouter = express.Router();

collaboratorRouter.get("/collaborators", (req, res) => {
  res.send("Get All collaborators");
});

collaboratorRouter.get("/collaborators/:id", (req, res) => {
  res.send("Get collaborator by id");
});

collaboratorRouter.post("/collaborators", (req, res) => {
  res.send("Create collaborator");
});

collaboratorRouter.put("/collaborators/:id", (req, res) => {
  res.send("Update collaborator");
});

collaboratorRouter.delete("/collaborators/:id", (req, res) => {
  res.send("Delete collaborator");
});

export default collaboratorRouter;
