"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = exports.TaskService = void 0;
var task_service_1 = require("./task.service");
Object.defineProperty(exports, "TaskService", { enumerable: true, get: function () { return __importDefault(task_service_1).default; } });
var user_service_1 = require("./user.service");
Object.defineProperty(exports, "UserService", { enumerable: true, get: function () { return __importDefault(user_service_1).default; } });
