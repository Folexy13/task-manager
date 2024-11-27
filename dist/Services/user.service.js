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
const Models_1 = require("../Models"); // Assuming your Sequelize User model is named "User"
const bcryptjs_1 = __importDefault(require("bcryptjs")); // For hashing passwords
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken")); // For creating JWT tokens
const Config_1 = require("../Config");
const pagination_1 = require("../Utils/pagination");
const saltRounds = 10; // Number of rounds for bcrypt hashing
/**
 * Represents a service for managing Users.
 * @description Provides methods for creating, managing, and interacting with Users.
 * @author - Folajimi
 */
class UserService {
    /**
     * Create a UserService instance.
     * @constructor
     * @description Initializes an instance of the UserService class.
     */
    constructor() { }
    /**
     * Create a new user.
     * @method
     * @param {IUserProps} input - The properties of the User.
     * @returns {Promise<any>} - A promise that resolves to the full details of the created User.
     * @throws Will throw an error if the input is invalid.
     */
    CreateUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { email } = input;
                // Hashing the password before saving the user
                const hashedPassword = yield bcryptjs_1.default.hash(input.password, saltRounds);
                const isUserExist = yield Models_1.UserModel.findOne({
                    where: { email },
                });
                if (isUserExist) {
                    throw new Error("User already Exists!!");
                }
                // Creating a new user using Sequelize's create method
                const newUser = yield Models_1.UserModel.create(Object.assign(Object.assign({}, input), { password: hashedPassword }));
                return newUser; // Returning the created user
            }
            catch (error) {
                throw new Error((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error);
            }
        });
    }
    /**
     * Retrieve all users.
     * @method
     * @returns {Promise<any[]>} - A promise that resolves to an array of users.
     * @throws Will throw an error if the retrieval fails.
     */
    GetAllUsers() {
        return __awaiter(this, arguments, void 0, function* (limit = 10, page = 1) {
            var _a;
            try {
                limit = Math.max(limit, 1); // Minimum of 1
                page = Math.max(page, 1); // Minimum of 1
                // Call the paginate utility to fetch paginated tasks
                const paginationResult = yield (0, pagination_1.paginate)(Models_1.UserModel, { limit, page, total: 0 });
                return paginationResult;
            }
            catch (error) {
                throw new Error((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error);
            }
        });
    }
    /**
     * Retrieve a specific User by ID.
     * @method
     * @param {number} userId - The ID of the user to retrieve.
     * @returns {Promise<any>} - A promise that resolves to the user details.
     * @throws Will throw an error if the user is not found.
     */
    GetUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const user = yield Models_1.UserModel.findByPk(userId); // Find user by primary key (ID)
                if (!user) {
                    throw new Error("User not found.");
                }
                return user; // Returning the user if found
            }
            catch (error) {
                throw new Error((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error);
            }
        });
    }
    /**
     * Update a specific User by ID.
     * @method
     * @param {number} userId - The ID of the user to update.
     * @param {IUserProps} input - The properties to update on the user.
     * @returns {Promise<any>} - A promise that resolves to the updated user.
     * @throws Will throw an error if the user is not found or update fails.
     */
    UpdateUser(user, input) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                if (!user) {
                    throw new Error("User not found.");
                }
                if (input.role && user.role !== "admin") {
                    throw new Error("Only Admin can change roles");
                }
                if (input.id !== user.id) {
                    throw new Error("Only  this user can edit thier password!!");
                }
                // Updating user properties
                const updatedUser = yield user.update(input);
                return updatedUser; // Returning the updated user
            }
            catch (error) {
                throw new Error((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error);
            }
        });
    }
    /**
     * Delete a specific User by ID.
     * @method
     * @param {number} userId - The ID of the user to delete.
     * @returns {Promise<boolean>} - A promise that resolves to true if the user was deleted, or false if not.
     * @throws Will throw an error if the user is not found or deletion fails.
     */
    DeleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const user = yield Models_1.UserModel.findByPk(userId); // Find user by ID
                if (!user) {
                    throw new Error("User not found.");
                }
                // Deleting the user
                yield user.destroy(); // Destroy the user from the database
                return true; // Returning true if user is deleted
            }
            catch (error) {
                throw new Error((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error);
            }
        });
    }
    /**
     * Set the role for a specific user.
     * @method
     * @param {number} userId - The ID of the user to update the role for.
     * @param {string} role - The role to assign to the user (e.g., 'admin', 'user').
     * @returns {Promise<any>} - A promise that resolves to the updated user with the new role.
     * @throws Will throw an error if the user is not found or role update fails.
     */
    SetUserRole(userId, role) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const user = yield Models_1.UserModel.findByPk(userId); // Find user by ID
                if (!user) {
                    throw new Error("User not found.");
                }
                // Updating the role of the user
                user.role = role; // Set the new role
                yield user.save(); // Save the updated user back to the database
                return user; // Returning the user with the updated role
            }
            catch (error) {
                throw new Error((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error);
            }
        });
    }
    /**
     * Login a user by verifying credentials.
     * @method
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<string>} - A promise that resolves to a JWT token if login is successful.
     * @throws Will throw an error if the user is not found or credentials are invalid.
     */
    LoginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const user = yield Models_1.UserModel.findOne({ where: { email } }); // Find user by email
                if (!user) {
                    throw new Error("User not found.");
                }
                // Compare the provided password with the stored hashed password
                const isPasswordValid = yield bcryptjs_1.default.compare(password, user.password);
                if (!isPasswordValid) {
                    throw new Error("Invalid credentials.");
                }
                // Create JWT token
                const token = jsonwebtoken_1.default.sign({ id: user.id, role: user.role }, Config_1.config.jwtSecret, // Use the secret from the environment variables
                { expiresIn: "1h" } // Set token expiration time
                );
                return token; // Returning the JWT token
            }
            catch (error) {
                throw new Error((_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : error);
            }
        });
    }
}
exports.default = UserService;
