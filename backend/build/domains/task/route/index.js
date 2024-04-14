"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskRouter = express_1.default.Router();
taskRouter.get("/tasks", (req, res) => {
    res.send("Get All tasks");
});
taskRouter.get("/tasks/:id", (req, res) => {
    res.send("Get task by id");
});
taskRouter.post("/tasks", (req, res) => {
    res.send("Create task");
});
taskRouter.put("/tasks/:id", (req, res) => {
    res.send("Update task");
});
taskRouter.delete("/tasks/:id", (req, res) => {
    res.send("Delete task");
});
exports.default = taskRouter;
