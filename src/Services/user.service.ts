import { IUserProps } from "../Interfaces";  // Interface for user properties
import { UserModel } from "../Models";  // Assuming your Sequelize User model is named "User"
import bcrypt from "bcryptjs";  // For hashing passwords
import jwt from "jsonwebtoken";  // For creating JWT tokens

const saltRounds = 10;  // Number of rounds for bcrypt hashing

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
    public async CreateUser(input: IUserProps): Promise<any> {
        try {
            // Hashing the password before saving the user
            const hashedPassword = await bcrypt.hash(input.password, saltRounds);

            // Creating a new user using Sequelize's create method
            const newUser = await UserModel.create({
                ...input,  // Spread the input to create the user
                password: hashedPassword,  // Save the hashed password
            });
            return newUser; // Returning the created user
        } catch (error) {
            console.log(error);
            throw new Error("Failed to create user.");
        }
    }

    /**
     * Retrieve all users.
     * @method
     * @returns {Promise<any[]>} - A promise that resolves to an array of users.
     * @throws Will throw an error if the retrieval fails.
     */
    public async GetAllUsers(): Promise<any[]> {
        try {
            const users = await UserModel.findAll();  // Get all users from the database
            return users;  // Returning all users
        } catch (error) {
            console.log(error);
            throw new Error("Failed to retrieve users.");
        }
    }

    /**
     * Retrieve a specific User by ID.
     * @method
     * @param {number} userId - The ID of the user to retrieve.
     * @returns {Promise<any>} - A promise that resolves to the user details.
     * @throws Will throw an error if the user is not found.
     */
    public async GetUserById(userId: number): Promise<any> {
        try {
            const user = await UserModel.findByPk(userId);  // Find user by primary key (ID)
            if (!user) {
                throw new Error("User not found.");
            }
            return user;  // Returning the user if found
        } catch (error) {
            console.log(error);
            throw new Error("Failed to retrieve user.");
        }
    }

    /**
     * Update a specific User by ID.
     * @method
     * @param {number} userId - The ID of the user to update.
     * @param {IUserProps} input - The properties to update on the user.
     * @returns {Promise<any>} - A promise that resolves to the updated user.
     * @throws Will throw an error if the user is not found or update fails.
     */
    public async UpdateUser(userId: number, input: IUserProps): Promise<any> {
        try {
            const user = await UserModel.findByPk(userId);  // Find the user by ID
            if (!user) {
                throw new Error("User not found.");
            }
            if (input.role && user.role !== "admin") {
                throw new Error("Only Admin can change roles");
            }
            // Updating user properties
            const updatedUser = await user.update(input);
            return updatedUser;  // Returning the updated user
        } catch (error) {
            console.log(error);
            throw new Error("Failed to update user.");
        }
    }

    /**
     * Delete a specific User by ID.
     * @method
     * @param {number} userId - The ID of the user to delete.
     * @returns {Promise<boolean>} - A promise that resolves to true if the user was deleted, or false if not.
     * @throws Will throw an error if the user is not found or deletion fails.
     */
    public async DeleteUser(userId: number): Promise<boolean> {
        try {
            const user = await UserModel.findByPk(userId);  // Find user by ID
            if (!user) {
                throw new Error("User not found.");
            }
            // Deleting the user
            await user.destroy();  // Destroy the user from the database
            return true;  // Returning true if user is deleted
        } catch (error) {
            console.log(error);
            throw new Error("Failed to delete user.");
        }
    }

    /**
     * Set the role for a specific user.
     * @method
     * @param {number} userId - The ID of the user to update the role for.
     * @param {string} role - The role to assign to the user (e.g., 'admin', 'user').
     * @returns {Promise<any>} - A promise that resolves to the updated user with the new role.
     * @throws Will throw an error if the user is not found or role update fails.
     */
    public async SetUserRole(userId: number, role: string): Promise<any> {
        try {
            const user = await UserModel.findByPk(userId);  // Find user by ID
            if (!user) {
                throw new Error("User not found.");
            }
            // Updating the role of the user
            user.role = role;  // Set the new role
            await user.save();  // Save the updated user back to the database
            return user;  // Returning the user with the updated role
        } catch (error) {
            console.log(error);
            throw new Error("Failed to set user role.");
        }
    }

    /**
     * Login a user by verifying credentials.
     * @method
     * @param {string} email - The email of the user.
     * @param {string} password - The password of the user.
     * @returns {Promise<string>} - A promise that resolves to a JWT token if login is successful.
     * @throws Will throw an error if the user is not found or credentials are invalid.
     */
    public async LoginUser(email: string, password: string): Promise<string> {
        try {
            const user = await UserModel.findOne({ where: { email } });  // Find user by email
            if (!user) {
                throw new Error("User not found.");
            }

            // Compare the provided password with the stored hashed password
            const isPasswordValid = await bcrypt.compare(password, user.full_name);
            if (!isPasswordValid) {
                throw new Error("Invalid credentials.");
            }

            // Create JWT token
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET as string,  // Use the secret from the environment variables
                { expiresIn: "1h" }  // Set token expiration time
            );

            return token;  // Returning the JWT token
        } catch (error) {
            console.log(error);
            throw new Error("Login failed.");
        }
    }
}

export default UserService;
