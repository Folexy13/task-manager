import { UserService } from "../Services";
import { UserModel } from "../Models";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { paginate } from "../Utils/pagination";
// import  jest from "jest"

jest.mock("../Models/user.model"); // Mocking the User model
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../Utils/pagination");

describe("UserService", () => {
    const userService = new UserService();

    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });

    it("should create a new user", async () => {
        const mockUserInput: any = { full_name: "John Doe", email: "john@example.com", password: "password123" };
        const hashedPassword = "hashedPassword123";
        const mockUser = { id: 1, ...mockUserInput, password: hashedPassword };

        // Mocking bcrypt.hash and UserModel.create
        (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
        (UserModel.findOne as jest.Mock).mockResolvedValue(null); // No existing user
        (UserModel.create as jest.Mock).mockResolvedValue(mockUser);

        const result = await userService.CreateUser(mockUserInput);

        expect(bcrypt.hash).toHaveBeenCalledWith(mockUserInput.password, 10);
        expect(UserModel.findOne).toHaveBeenCalledWith({ where: { email: mockUserInput.email } });
        expect(UserModel.create).toHaveBeenCalledWith({
            ...mockUserInput,
            password: hashedPassword,
        });
        expect(result).toEqual(mockUser);
    });

    it("should throw an error if user already exists during creation", async () => {
        const mockUserInput: any = { full_name: "John Doe", email: "john@example.com", password: "password123" };

        // Mocking UserModel.findOne to return an existing user
        (UserModel.findOne as jest.Mock).mockResolvedValue({ id: 1, email: "john@example.com" });

        await expect(userService.CreateUser(mockUserInput)).rejects.toThrow("User already Exists!!");
    });

    it("should fetch all users with pagination", async () => {
        const mockUsers = [
            { id: 1, full_name: "John Doe", email: "john@example.com" },
            { id: 2, full_name: "Jane Doe", email: "jane@example.com" },
        ];
        const mockPaginationResult = { total: 2, currentPage: 1, data: mockUsers };

        // Mocking paginate utility
        (paginate as jest.Mock).mockResolvedValue(mockPaginationResult);

        const result = await userService.GetAllUsers(10, 1);

        expect(paginate).toHaveBeenCalledWith(UserModel, { limit: 10, page: 1, total: 0 });
        expect(result).toEqual(mockPaginationResult);
    });

    it("should retrieve a user by ID", async () => {
        const mockUser = { id: 1, full_name: "John Doe", email: "john@example.com" };

        // Mocking UserModel.findByPk
        (UserModel.findByPk as jest.Mock).mockResolvedValue(mockUser);

        const result = await userService.GetUserById(1);

        expect(UserModel.findByPk).toHaveBeenCalledWith(1);
        expect(result).toEqual(mockUser);
    });

    it("should throw an error if user is not found by ID", async () => {
        // Mocking UserModel.findByPk to return null
        (UserModel.findByPk as jest.Mock).mockResolvedValue(null);

        await expect(userService.GetUserById(9999)).rejects.toThrow("User not found.");
    });

    it("should update a user", async () => {
        const mockUser = { full_name: "John Doe", role: "user", update: jest.fn().mockResolvedValue(true) };
        const input: any = { full_name: "Updated Name" };

        // Mocking UserModel.findByPk
        (UserModel.findByPk as jest.Mock).mockResolvedValue(mockUser);

        const result = await userService.UpdateUser(mockUser, input);

        expect(mockUser.update).toHaveBeenCalledWith(input);
        expect(result).toBe(true);
    });

    it("should delete a user", async () => {
        const mockUser = { id: 1, name: "John Doe", destroy: jest.fn().mockResolvedValue(true) };

        // Mocking UserModel.findByPk
        (UserModel.findByPk as jest.Mock).mockResolvedValue(mockUser);

        const result = await userService.DeleteUser(1);

        expect(mockUser.destroy).toHaveBeenCalled();
        expect(result).toBe(true);
    });

    it("should throw an error if user not found for deletion", async () => {
        // Mocking UserModel.findByPk to return null
        (UserModel.findByPk as jest.Mock).mockResolvedValue(null);

        await expect(userService.DeleteUser(9999)).rejects.toThrow("User not found.");
    });

    it("should login a user and return a JWT token", async () => {
        const mockUser = {
            id: 1,
            email: "john@example.com",
            password: "hashedPassword123",
            role: "user",
        };
        const mockToken = "mockJwtToken";

        // Mocking UserModel.findOne, bcrypt.compare, and jwt.sign
        (UserModel.findOne as jest.Mock).mockResolvedValue(mockUser);
        (bcrypt.compare as jest.Mock).mockResolvedValue(true); // Password match
        (jwt.sign as jest.Mock).mockReturnValue(mockToken);

        const result = await userService.LoginUser("john@example.com", "password123");

        expect(UserModel.findOne).toHaveBeenCalledWith({ where: { email: "john@example.com" } });
        expect(bcrypt.compare).toHaveBeenCalledWith("password123", mockUser.password);
        expect(jwt.sign).toHaveBeenCalledWith(
            { id: mockUser.id, role: mockUser.role },
            expect.any(String),
            { expiresIn: "1h" }
        );
        expect(result).toBe(mockToken);
    });

    it("should throw an error if login credentials are invalid", async () => {
        (UserModel.findOne as jest.Mock).mockResolvedValue(null); // User not found

        await expect(userService.LoginUser("invalid@example.com", "password123")).rejects.toThrow("User not found.");
    });
});
