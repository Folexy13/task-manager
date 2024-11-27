"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Middlewares_1 = require("../Middlewares");
const Validations_1 = __importDefault(require("../Validations"));
const Helpers_1 = require("../Helpers");
const Controllers_1 = require("../Controllers/");
// Create a new router instance
const router = (0, express_1.Router)();
/**
 * Represents the routes for managing tasks.
 * @module
 * @description This module sets up the routes for creating, reading, updating, and deleting tasks.
 * @author - Folajimi
 */
/**
 * Route for handling task-related actions:
 * - POST: Create a new task.
 * - GET: Retrieve all tasks.
 * @route {POST} /tasks
 * @route {GET} /tasks
 * @description
 * - The `POST` route validates input, verifies the token, and delegates to `CreateTask` method of the TaskController.
 * - The `GET` route retrieves all tasks by calling the `GetAllTasks` method of the TaskController.
 */
router
    .route(`/`)
    .post((0, Validations_1.default)(Helpers_1.ROUTES.TASK), Middlewares_1.verifyToken, Controllers_1.TaskController.CreateTask) // Create task
    .get(Controllers_1.TaskController.GetAllTasks); // Retrieve all tasks
/**
 * Route for handling task actions by ID:
 * - `PUT`: Update an existing task by ID (requires validation, token verification, and role check).
 * - `DELETE`: Delete a task by ID (requires token verification and admin role check).
 * @route {PUT} /tasks/:id
 * @route {DELETE} /tasks/:id
 * @description
 * - The `PUT` route validates input using validation middleware, verifies the token,
 *   and delegates to the `UpdateTask` method of the `TaskController`.
 * - The `DELETE` route verifies the token, checks for admin role using `verifyAdmin`,
 *   and delegates to the `DeleteTask` method of the `TaskController`.
 */
router
    .route(`/:id`)
    .get(Controllers_1.TaskController.GetTaskById)
    .put(// Validate input for task update
Middlewares_1.verifyToken, // Verify the authentication token
Controllers_1.TaskController.UpdateTask // Delegate to TaskController for update
)
    .delete(Middlewares_1.verifyToken, // Verify the authentication token
Controllers_1.TaskController.DeleteTask // Delegate to TaskController for task deletion
);
// Export the router for use in the application
exports.default = router;
