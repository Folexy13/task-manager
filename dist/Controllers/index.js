"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = exports.TaskController = void 0;
var task_controller_1 = require("./task.controller");
Object.defineProperty(exports, "TaskController", { enumerable: true, get: function () { return __importDefault(task_controller_1).default; } });
var user_controller_1 = require("./user.controller");
Object.defineProperty(exports, "UserController", { enumerable: true, get: function () { return __importDefault(user_controller_1).default; } });
