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
const Services_1 = require("../Services");
const Models_1 = require("../Models");
const pagination_1 = require("../Utils/pagination");
jest.mock('../Models/Task'); // Mocking the TaskModel
jest.mock('../Utils/pagination', () => ({
    paginate: jest.fn(),
}));
describe('TaskService', () => {
    const taskService = new Services_1.TaskService();
    afterEach(() => {
        jest.clearAllMocks();
    });
    it('should fetch all tasks with pagination', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockTasks = [
            { id: 1, title: 'Task 1', description: 'Test Task 1', status: 'In Progress' },
            { id: 2, title: 'Task 2', description: 'Test Task 2', status: 'Completed' },
        ];
        // Mocking the paginate utility
        pagination_1.paginate.mockResolvedValue({
            data: mockTasks,
            total: 2,
            currentPage: 1,
            totalPages: 1,
        });
        const result = yield taskService.GetAllTasks(10, 1);
        expect(pagination_1.paginate).toHaveBeenCalledWith(Models_1.TaskModel, { limit: 10, page: 1, total: 0 });
        expect(result).toHaveProperty('total');
        expect(result).toHaveProperty('currentPage');
        expect(result.data).toEqual(mockTasks);
    }));
    it('should create a new task', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockTask = { id: 1, title: 'New Task', "due_date": "2024-11-27T17:39:46.758Z", description: 'Test Task', status: 'In Progress' };
        // Mocking TaskModel.create
        Models_1.TaskModel.create.mockResolvedValue(mockTask);
        const result = yield taskService.CreateTask(mockTask);
        expect(Models_1.TaskModel.create).toHaveBeenCalledWith(mockTask);
        expect(result).toEqual(mockTask);
    }));
    it('should update a task', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockTask = { id: 1, title: 'Updated Task', description: 'Updated Description' };
        const mockExistingTask = { update: jest.fn().mockResolvedValue(mockTask) };
        // Mocking TaskModel.findByPk
        Models_1.TaskModel.findByPk.mockResolvedValue(mockExistingTask);
        const result = yield taskService.UpdateTask(1, mockTask);
        expect(Models_1.TaskModel.findByPk).toHaveBeenCalledWith(1);
        expect(mockExistingTask.update).toHaveBeenCalledWith(mockTask);
        expect(result).toEqual(mockTask);
    }));
    it('should delete a task', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockExistingTask = { destroy: jest.fn().mockResolvedValue(true) };
        // Mocking TaskModel.findByPk
        Models_1.TaskModel.findByPk.mockResolvedValue(mockExistingTask);
        const result = yield taskService.DeleteTask(1);
        expect(Models_1.TaskModel.findByPk).toHaveBeenCalledWith(1);
        expect(mockExistingTask.destroy).toHaveBeenCalled();
        expect(result).toBe(true);
    }));
    it('should throw an error if task not found for update or delete', () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking TaskModel.findByPk
        Models_1.TaskModel.findByPk.mockResolvedValue(null);
        yield expect(taskService.UpdateTask(9999, { title: 'Nonexistent' })).rejects.toThrow('Task not found.');
        yield expect(taskService.DeleteTask(9999)).rejects.toThrow('Task not found.');
    }));
});
