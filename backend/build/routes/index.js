"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollaboratorRouter = exports.TaskRouter = exports.ProjectRouter = void 0;
var route_1 = require("domains/project/route");
Object.defineProperty(exports, "ProjectRouter", { enumerable: true, get: function () { return __importDefault(route_1).default; } });
var route_2 = require("domains/task/route");
Object.defineProperty(exports, "TaskRouter", { enumerable: true, get: function () { return __importDefault(route_2).default; } });
var route_3 = require("domains/collaborator/route");
Object.defineProperty(exports, "CollaboratorRouter", { enumerable: true, get: function () { return __importDefault(route_3).default; } });
