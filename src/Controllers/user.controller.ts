import { AuthenticatedRequest } from "../Interfaces";
import { Request, Response, NextFunction } from "express";
import { UserService } from "../Services";

/**
 */
const {
    CreateUser, LoginUser, GetAllUsers, GetUserById, DeleteUser, UpdateUser, SetUserRole
} = new UserService()
class UserController {

    /**
     * Creates an instance of UserController with the associated UserService.
     * @constructor
     */
    constructor() {
    }

    /**
     * Registers a new user.
     * @method CreateUser
     * @param {Request} req - The request object containing user details in the body.
     * @param {Response} res - The response object to send back the newly created user.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the user is successfully created.
     * @throws Will throw an error if user creation fails.
     * 
     */
    public async CreateUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const newUser = await CreateUser(req.body);
            res.status(200).json(newUser); // Return the created user
        } catch (error: any) {
            res.status(400).json({ error: error.message || error });
        }
    }

    /**
     * Logs in a user by validating credentials and generating a JWT token.
     * @method Login
     * @param {Request} req - The request object containing email and password in the body.
     * @param {Response} res - The response object to send back the generated JWT token.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the user is logged in and a token is generated.
     * @throws Will throw an error if login fails due to invalid credentials.
     */
    public async LoginUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const { email, password } = req.body; // Extract email and password from request body
        try {
            const token = await LoginUser(email, password);
            res.status(200).json({ token }); // Return the token
        } catch (error: any) {
            res.status(400).json({ error: error.message || error });
        }
    }

    /**
     * Retrieves all users.
     * @method GetAllUsers
     * @param {Request} req - The request object.
     * @param {Response} res - The response object to send back the list of all users.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the list of users is fetched.
     * @throws Will throw an error if fetching users fails.
     */
    public async GetAllUsers(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {

            const users = await GetAllUsers();
            res.status(200).json(users); // Return the list of users
        } catch (error: any) {
            res.status(400).json({ error: error.message || error });
        }
    }

    /**
     * Retrieves a specific user by ID.
     * @method GetUserById
     * @param {Request} req - The request object containing the user ID in params.
     * @param {Response} res - The response object to send back the user details.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the user is fetched.
     * @throws Will throw an error if retrieving the user fails.
     */
    public async GetUserById(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const userId = parseInt(req.params.id, 10); // Extract user ID from URL params
        try {
            const user = await GetUserById(userId);
            res.status(200).json(user); // Return the specific user
        } catch (error: any) {
            res.status(400).json({ error: error.message || error });
        }
    }

    /**
     * Updates a user's details.
     * @method UpdateUser
     * @param {Request} req - The request object containing the user ID and updated details in the body.
     * @param {Response} res - The response object to send back the updated user details.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the user is updated.
     * @throws Will throw an error if updating the user fails.
     */
    public async UpdateUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const userId = parseInt(req.params.id, 10); // Extract user ID from URL params
        const updatedDetails = req.body; // Get updated user details from the request body
        try {
            const updatedUser = await UpdateUser(userId, updatedDetails);
            res.status(200).json(updatedUser); // Return the updated user
        } catch (error: any) {
            res.status(400).json({ error: error.message || error });
        }
    }

    /**
     * Deletes a user by ID.
     * @method DeleteUser
     * @param {Request} req - The request object containing the user ID in params.
     * @param {Response} res - The response object to send the result of deletion.
     * @param {NextFunction} next - The next middleware function.
     * @returns {Promise<void>} - A promise that resolves when the user is deleted.
     * @throws Will throw an error if user deletion fails.
     */
    public async DeleteUser(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const userId = parseInt(req.params.id, 10); // Extract user ID from URL params
        try {
            const isDeleted = await DeleteUser(userId);
            if (isDeleted) {
                res.status(200).json({ message: "User successfully deleted." }); // Success response
            } else {
                res.status(404).json({ message: "User not found." }); // User not found error
            }
        } catch (error: any) {
            res.status(400).json({ error: error.message || error });
        }
    }

    /**
    * Sets or updates the role of an existing user.
    * @method setRole
    * @param {Request} req - The request object containing the user ID and new role in the body or params.
    * @param {Response} res - The response object to send back the updated user with the new role.
    * @param {NextFunction} next - The next middleware function.
    * @returns {Promise<void>} - A promise that resolves when the user's role is successfully updated.
    * @throws Will throw an error if updating the user's role fails.
    */
    public async setRole(
        req: AuthenticatedRequest,
        res: Response,
    ): Promise<void> {
        const userId = parseInt(req.params.id, 10); // Extract the user ID from URL params
        try {
            const updatedUser = await SetUserRole(userId, req.user.role);
            res.status(200).json(updatedUser); // Return the user with the updated role
        } catch (error: any) {
            res.status(400).json({ error: error.message || error });
        }
    }
}

// Instantiate and export the controller
const newUserController = new UserController();
export default newUserController;
