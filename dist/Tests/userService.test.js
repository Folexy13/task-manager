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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Services_1 = require("../Services");
const Models_1 = require("../Models");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const pagination_1 = require("../Utils/pagination");
// import  jest from "jest"
jest.mock("../Models/User"); // Mocking the User model
jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../Utils/pagination");
describe("UserService", () => {
    const userService = new Services_1.UserService();
    afterEach(() => {
        jest.clearAllMocks(); // Clear mocks after each test
    });
    it("should create a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUserInput = { full_name: "John Doe", email: "john@example.com", password: "password123" };
        const hashedPassword = "hashedPassword123";
        const mockUser = Object.assign(Object.assign({ id: 1 }, mockUserInput), { password: hashedPassword });
        // Mocking bcrypt.hash and UserModel.create
        bcryptjs_1.default.hash.mockResolvedValue(hashedPassword);
        Models_1.UserModel.findOne.mockResolvedValue(null); // No existing user
        Models_1.UserModel.create.mockResolvedValue(mockUser);
        const result = yield userService.CreateUser(mockUserInput);
        expect(bcryptjs_1.default.hash).toHaveBeenCalledWith(mockUserInput.password, 10);
        expect(Models_1.UserModel.findOne).toHaveBeenCalledWith({ where: { email: mockUserInput.email } });
        expect(Models_1.UserModel.create).toHaveBeenCalledWith(Object.assign(Object.assign({}, mockUserInput), { password: hashedPassword }));
        expect(result).toEqual(mockUser);
    }));
    it("should throw an error if user already exists during creation", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUserInput = { full_name: "John Doe", email: "john@example.com", password: "password123" };
        // Mocking UserModel.findOne to return an existing user
        Models_1.UserModel.findOne.mockResolvedValue({ id: 1, email: "john@example.com" });
        yield expect(userService.CreateUser(mockUserInput)).rejects.toThrow("User already Exists!!");
    }));
    it("should fetch all users with pagination", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUsers = [
            { id: 1, name: "John Doe", email: "john@example.com" },
            { id: 2, name: "Jane Doe", email: "jane@example.com" },
        ];
        const mockPaginationResult = { total: 2, currentPage: 1, data: mockUsers };
        // Mocking paginate utility
        pagination_1.paginate.mockResolvedValue(mockPaginationResult);
        const result = yield userService.GetAllUsers(10, 1);
        expect(pagination_1.paginate).toHaveBeenCalledWith(Models_1.UserModel, { limit: 10, page: 1, total: 0 });
        expect(result).toEqual(mockPaginationResult);
    }));
    it("should retrieve a user by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = { id: 1, name: "John Doe", email: "john@example.com" };
        // Mocking UserModel.findByPk
        Models_1.UserModel.findByPk.mockResolvedValue(mockUser);
        const result = yield userService.GetUserById(1);
        expect(Models_1.UserModel.findByPk).toHaveBeenCalledWith(1);
        expect(result).toEqual(mockUser);
    }));
    it("should throw an error if user is not found by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking UserModel.findByPk to return null
        Models_1.UserModel.findByPk.mockResolvedValue(null);
        yield expect(userService.GetUserById(9999)).rejects.toThrow("User not found.");
    }));
    it("should update a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = { id: 1, full_name: "John Doe", role: "user", update: jest.fn().mockResolvedValue(true) };
        const input = { full_name: "Updated Name" };
        // Mocking UserModel.findByPk
        Models_1.UserModel.findByPk.mockResolvedValue(mockUser);
        const result = yield userService.UpdateUser(mockUser, input);
        expect(mockUser.update).toHaveBeenCalledWith(input);
        expect(result).toBe(true);
    }));
    it("should delete a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = { id: 1, name: "John Doe", destroy: jest.fn().mockResolvedValue(true) };
        // Mocking UserModel.findByPk
        Models_1.UserModel.findByPk.mockResolvedValue(mockUser);
        const result = yield userService.DeleteUser(1);
        expect(mockUser.destroy).toHaveBeenCalled();
        expect(result).toBe(true);
    }));
    it("should throw an error if user not found for deletion", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocking UserModel.findByPk to return null
        Models_1.UserModel.findByPk.mockResolvedValue(null);
        yield expect(userService.DeleteUser(9999)).rejects.toThrow("User not found.");
    }));
    it("should login a user and return a JWT token", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockUser = {
            id: 1,
            email: "john@example.com",
            password: "hashedPassword123",
            role: "user",
        };
        const mockToken = "mockJwtToken";
        // Mocking UserModel.findOne, bcrypt.compare, and jwt.sign
        Models_1.UserModel.findOne.mockResolvedValue(mockUser);
        bcryptjs_1.default.compare.mockResolvedValue(true); // Password match
        jsonwebtoken_1.default.sign.mockReturnValue(mockToken);
        const result = yield userService.LoginUser("john@example.com", "password123");
        expect(Models_1.UserModel.findOne).toHaveBeenCalledWith({ where: { email: "john@example.com" } });
        expect(bcryptjs_1.default.compare).toHaveBeenCalledWith("password123", mockUser.password);
        expect(jsonwebtoken_1.default.sign).toHaveBeenCalledWith({ id: mockUser.id, role: mockUser.role }, expect.any(String), { expiresIn: "1h" });
        expect(result).toBe(mockToken);
    }));
    it("should throw an error if login credentials are invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        Models_1.UserModel.findOne.mockResolvedValue(null); // User not found
        yield expect(userService.LoginUser("invalid@example.com", "password123")).rejects.toThrow("User not found.");
    }));
});
