"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Models_1 = require("../Models");
const pagination_1 = require("../Utils/pagination");
/**
 * Represents a service for managing Tasks.
 * @class
 * @description Provides methods for creating, managing, and interacting with Tasks.
 * @author - Folajimi
 */
class TaskService {
    /**
     * Create a TaskService instance.
     * @constructor
     * @description Initializes an instance of the TaskService class.
     */
    constructor() { }
    /**
     * Create a new Task.
     * @method
     * @param {ITaskProps} input - The properties of the Task.
     * @returns {Promise<any>} - A promise that resolves to the full details of the created Task.
     * @throws Will throw an error if the input is invalid.
     */
    CreateTask(input) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                // Creating a new task using Sequelize's create method
                const newTask = yield Models_1.TaskModel.create(Object.assign({}, input));
                return newTask; // Returning the created task
            }
            catch (error) {
                throw new Error((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error);
            }
        });
    }
    /**
     * Retrieve all tasks.
     * @method
     * @returns {Promise<any[]>} - A promise that resolves to an array of tasks.
     * @throws Will throw an error if the retrieval fails.
     */
    GetAllTasks() {
        return __awaiter(this, arguments, void 0, function* (limit = 10, page = 1) {
            var _a;
            try {
                limit = Math.max(limit, 1); // Minimum of 1
                page = Math.max(page, 1); // Minimum of 1
                // Call the paginate utility to fetch paginated tasks
                const paginationResult = yield (0, pagination_1.paginate)(Models_1.TaskModel, { limit, page, total: 0 });
                return paginationResult;
            }
            catch (error) {
                throw new Error((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error);
            }
        });
    }
    /**
     * Retrieve a specific Task by ID.
     * @method
     * @param {number} taskId - The ID of the task to retrieve.
     * @returns {Promise<any>} - A promise that resolves to the task details.
     * @throws Will throw an error if the task is not found.
     */
    GetTaskById(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const task = yield Models_1.TaskModel.findByPk(taskId);
                if (!task) {
                    throw new Error("Task not found.");
                }
                return task; // Returning the task if found
            }
            catch (error) {
                console.log(error);
                throw new Error((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error);
            }
        });
    }
    /**
     * Update a specific Task by ID.
     * @method
     * @param {number} taskId - The ID of the task to update.
     * @param {ITaskProps} input - The properties to update on the task.
     * @returns {Promise<any>} - A promise that resolves to the updated task.
     * @throws Will throw an error if the task is not found or update fails.
     */
    UpdateTask(taskId, input) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const task = yield Models_1.TaskModel.findByPk(taskId);
                if (!task) {
                    throw new Error("Task not found.");
                }
                // Updating task properties
                const updatedTask = yield task.update(input);
                return updatedTask; // Returning the updated task
            }
            catch (error) {
                throw new Error((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error);
            }
        });
    }
    /**
     * Delete a specific Task by ID.
     * @method
     * @param {number} taskId - The ID of the task to delete.
     * @returns {Promise<boolean>} - A promise that resolves to true if the task was deleted, or false if not.
     * @throws Will throw an error if the task is not found or deletion fails.
     */
    DeleteTask(taskId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const task = yield Models_1.TaskModel.findByPk(taskId);
                if (!task) {
                    throw new Error("Task not found.");
                }
                // Deleting the task
                yield task.destroy();
                return true; // Returning true if the task is deleted
            }
            catch (error) {
                throw new Error((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error);
            }
        });
    }
}
exports.default = TaskService;
