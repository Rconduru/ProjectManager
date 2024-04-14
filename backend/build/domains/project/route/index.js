"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const projectRouter = express_1.default.Router();
projectRouter.get("/projects", (req, res) => {
    res.send("Get All projects");
});
projectRouter.get("/projects/:id", (req, res) => {
    res.send("Get project by id");
});
projectRouter.post("/projects", (req, res) => {
    res.send("Create project");
});
projectRouter.put("/projects/:id", (req, res) => {
    res.send("Update project");
});
projectRouter.delete("/projects/:id", (req, res) => {
    res.send("Delete project");
});
exports.default = projectRouter;
