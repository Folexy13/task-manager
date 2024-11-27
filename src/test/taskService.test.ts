import { TaskService } from '../Services';
import { TaskModel } from '../Models';
import { paginate } from '../Utils/pagination';

jest.mock('../Models/task.model'); // Mocking the TaskModel
jest.mock('../Utils/pagination', () => ({
    paginate: jest.fn(),
}));

describe('TaskService', () => {
    const taskService = new TaskService();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should fetch all tasks with pagination', async () => {
        const mockTasks = [
            { id: 1, title: 'Task 1', description: 'Test Task 1', status: 'In Progress' },
            { id: 2, title: 'Task 2', description: 'Test Task 2', status: 'Completed' },
        ];

        // Mocking the paginate utility
        (paginate as jest.Mock).mockResolvedValue({
            data: mockTasks,
            total: 2,
            currentPage: 1,
            totalPages: 1,
        });

        const result = await taskService.GetAllTasks(10, 1);

        expect(paginate).toHaveBeenCalledWith(TaskModel, { limit: 10, page: 1, total: 0 });
        expect(result).toHaveProperty('total');
        expect(result).toHaveProperty('currentPage');
        expect(result.data).toEqual(mockTasks);
    });

    it('should create a new task', async () => {
        const mockTask = { id: 1, title: 'New Task', "due_date": "2024-11-27T17:39:46.758Z", description: 'Test Task', status: 'In Progress' };

        // Mocking TaskModel.create
        (TaskModel.create as jest.Mock).mockResolvedValue(mockTask);

        const result = await taskService.CreateTask(mockTask);

        expect(TaskModel.create).toHaveBeenCalledWith(mockTask);
        expect(result).toEqual(mockTask);
    });

    it('should update a task', async () => {
        const mockTask = { id: 1, title: 'Updated Task', description: 'Updated Description' };
        const mockExistingTask = { update: jest.fn().mockResolvedValue(mockTask) };

        // Mocking TaskModel.findByPk
        (TaskModel.findByPk as jest.Mock).mockResolvedValue(mockExistingTask);

        const result = await taskService.UpdateTask(1, mockTask);

        expect(TaskModel.findByPk).toHaveBeenCalledWith(1);
        expect(mockExistingTask.update).toHaveBeenCalledWith(mockTask);
        expect(result).toEqual(mockTask);
    });

    it('should delete a task', async () => {
        const mockExistingTask = { destroy: jest.fn().mockResolvedValue(true) };

        // Mocking TaskModel.findByPk
        (TaskModel.findByPk as jest.Mock).mockResolvedValue(mockExistingTask);

        const result = await taskService.DeleteTask(1);

        expect(TaskModel.findByPk).toHaveBeenCalledWith(1);
        expect(mockExistingTask.destroy).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    it('should throw an error if task not found for update or delete', async () => {
        // Mocking TaskModel.findByPk
        (TaskModel.findByPk as jest.Mock).mockResolvedValue(null);

        await expect(taskService.UpdateTask(9999, { title: 'Nonexistent' })).rejects.toThrow('Task not found.');
        await expect(taskService.DeleteTask(9999)).rejects.toThrow('Task not found.');
    });
});
