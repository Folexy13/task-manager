"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.TaskModel = void 0;
var task_model_1 = require("./task.model");
Object.defineProperty(exports, "TaskModel", { enumerable: true, get: function () { return __importDefault(task_model_1).default; } });
var user_model_1 = require("./user.model");
Object.defineProperty(exports, "UserModel", { enumerable: true, get: function () { return __importDefault(user_model_1).default; } });
