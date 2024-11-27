import { Router } from "express";
import { verifyToken, verifyAdmin } from "../Middlewares";
import validate from "../Validations";
import { ROUTES } from "../Helpers";
import { TaskController } from "../Controllers/";

// Create a new router instance
const router = Router();

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
	.post(validate(ROUTES.TASK), verifyToken, TaskController.CreateTask)  // Create task
	.get(TaskController.GetAllTasks);  // Retrieve all tasks

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
	.put(
		validate(ROUTES.TASK),          // Validate input for task update
		verifyToken,                    // Verify the authentication token
		TaskController.UpdateTask       // Delegate to TaskController for update
	)
	.delete(
		verifyToken,                    // Verify the authentication token
		verifyAdmin,                     // Ensure the user has admin privileges
		TaskController.DeleteTask       // Delegate to TaskController for task deletion
	);

// Export the router for use in the application
export default router;
