import { AuthenticatedRequest } from "../Interfaces";
import { Request, Response, NextFunction } from "express";
import { TaskService } from "../Services/";

/**
 * Represents a controller for managing Tasks.
 * @class
 * @description Provides endpoints for creating, managing, and interacting with tasks.
 * @author - Folajimi
 */

const { GetAllTasks, CreateTask, GetTaskById, UpdateTask, DeleteTask } = new TaskService()
class TaskController {

    /**
     * Create a TaskController instance.
     * @constructor
     * @description Initializes an instance of the TaskController class with the TaskService.
     */
    constructor() {
    }

    /**
     * Create a new Task.
     * @method
     * @param {AuthenticatedRequest} req - The authenticated request object containing the task details in the body.
     * @param {Response} res - The response object to send the created task details back.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the task is created.
     * @throws Will throw an error if task creation fails.
     */
    public async CreateTask(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            // Attempt to create a new task using the service method
            const newTask = await CreateTask(req.body);
            res.status(200).json({ status: true, newTask }); // Return the created task as a response
        } catch (error: any) {
            // Handle errors and send an appropriate response
            next(error)
        }
    }

    /**
     * Retrieve all tasks.
     * @method
     * @param {Request} req - The request object.
     * @param {Response} res - The response object to send the list of tasks.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the tasks are fetched.
     * @throws Will throw an error if retrieving tasks fails.
     */
    public async GetAllTasks(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const tasks = await GetAllTasks();
            res.status(200).json(tasks); // Return all tasks
        } catch (error: any) {
            next(error)
        }
    }

    /**
     * Retrieve a specific Task by ID.
     * @method
     * @param {Request} req - The request object containing the task ID in params.
     * @param {Response} res - The response object to send the task details.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the task is fetched.
     * @throws Will throw an error if task retrieval fails.
     */
    public async GetTaskById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const taskId = parseInt(req.params.id, 10); // Extract the task ID from the request parameters
        try {
            const task = await GetTaskById(taskId);
            res.status(200).json({ status: true, task }); // Return the specific task
        } catch (error: any) {
            next(error)
        }
    }

    /**
     * Update an existing Task.
     * @method
     * @param {AuthenticatedRequest} req - The authenticated request object containing the task ID and the updated task details in the body.
     * @param {Response} res - The response object to send the updated task.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the task is updated.
     * @throws Will throw an error if updating the task fails.
     */
    public async UpdateTask(
        req: AuthenticatedRequest,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const taskId = parseInt(req.params.id, 10); // Extract task ID from URL params
        const updatedDetails = req.body; // Get updated task details from the request body
        try {
            const updatedTask = await UpdateTask(taskId, updatedDetails);
            res.status(200).json({ statud: true, updatedTask }); // Return the updated task
        } catch (error: any) {
            next(error)
        }
    }

    /**
     * Delete a Task by ID.
     * @method
     * @param {AuthenticatedRequest} req - The authenticated request object containing the task ID in params.
     * @param {Response} res - The response object to send the result of deletion.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the task is deleted.
     * @throws Will throw an error if task deletion fails.
     */
    public async DeleteTask(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const taskId = parseInt(req.params.id, 10); // Extract task ID from URL params
        try {
            const isDeleted = await DeleteTask(taskId);
            if (isDeleted) {
                res.status(200).json({ status: true, message: "Task successfully deleted." }); // Success response
            } else {
                res.status(404).json({ status: false, message: "Task not found." }); // Task not found error
            }
        } catch (error: any) {
            next(error)
        }
    }
}

// Instantiate and export the controller
const newTaskController = new TaskController();
export default newTaskController;
