"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const collaboratorRouter = express_1.default.Router();
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
exports.default = collaboratorRouter;
