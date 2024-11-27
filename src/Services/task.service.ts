import { ITaskProps } from "../Interfaces";
import { TaskModel } from "../Models";
import { paginate } from "../Utils/pagination"

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
    public async CreateTask(input: ITaskProps): Promise<any> {
        try {
            // Creating a new task using Sequelize's create method
            const newTask = await TaskModel.create({
                ...input,
            });
            return newTask; // Returning the created task
        } catch (error: any) {
            throw new Error(error?.message ?? error);
        }
    }

    /**
     * Retrieve all tasks.
     * @method
     * @returns {Promise<any[]>} - A promise that resolves to an array of tasks.
     * @throws Will throw an error if the retrieval fails.
     */
    public async GetAllTasks(limit: number = 10, page: number = 1): Promise<any> {
        try {

            limit = Math.max(limit, 1);  // Minimum of 1
            page = Math.max(page, 1);    // Minimum of 1

            // Call the paginate utility to fetch paginated tasks
            const paginationResult = await paginate(TaskModel, { limit, page, total: 0 });

            return paginationResult;
        } catch (error: any) {
            throw new Error(error?.message ?? error);
        }
    }

    /**
     * Retrieve a specific Task by ID.
     * @method
     * @param {number} taskId - The ID of the task to retrieve.
     * @returns {Promise<any>} - A promise that resolves to the task details.
     * @throws Will throw an error if the task is not found.
     */
    public async GetTaskById(taskId: number): Promise<any> {
        try {
            const task = await TaskModel.findByPk(taskId);
            if (!task) {
                throw new Error("Task not found.");
            }
            return task; // Returning the task if found
        } catch (error: any) {
            console.log(error);
            throw new Error(error?.message ?? error);
        }
    }

    /**
     * Update a specific Task by ID.
     * @method
     * @param {number} taskId - The ID of the task to update.
     * @param {ITaskProps} input - The properties to update on the task.
     * @returns {Promise<any>} - A promise that resolves to the updated task.
     * @throws Will throw an error if the task is not found or update fails.
     */
    public async UpdateTask(taskId: number, input: ITaskProps): Promise<any> {
        try {
            const task = await TaskModel.findByPk(taskId);
            if (!task) {
                throw new Error("Task not found.");
            }
            // Updating task properties
            const updatedTask = await task.update(input);
            return updatedTask; // Returning the updated task
        } catch (error: any) {
            throw new Error(error?.message ?? error);
        }
    }

    /**
     * Delete a specific Task by ID.
     * @method
     * @param {number} taskId - The ID of the task to delete.
     * @returns {Promise<boolean>} - A promise that resolves to true if the task was deleted, or false if not.
     * @throws Will throw an error if the task is not found or deletion fails.
     */
    public async DeleteTask(taskId: number): Promise<boolean> {
        try {
            const task = await TaskModel.findByPk(taskId);
            if (!task) {
                throw new Error("Task not found.");
            }
            // Deleting the task
            await task.destroy();
            return true; // Returning true if the task is deleted
        } catch (error: any) {
            throw new Error(error?.message ?? error);
        }
    }
}

export default TaskService;
