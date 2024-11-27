import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../Models/user.model";
import { config } from "../Config";
import { AuthenticatedRequest } from "../Interfaces";

export async function verifyToken(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.header("Authorization")?.split(" ")[1] || "";

  if (!token) {
    res.status(401).json({ "Error": "Access denied. No token provided" });
  }

  console.log(token)
  try {
    const decoded: any = jwt.verify(token, config.jwtSecret);
    req.user = await User.findByPk(decoded.id, {
      attributes: { exclude: ['password'] } // Exclude password field
    });
    next();
  } catch (error: any) {
    next(error)
  }
}

/**
 * Middleware to verify if the user is authenticated and has an admin role.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {void} Calls next() if the user is an admin, or sends a 403 error if not.
 */
export async function verifyAdmin(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<any> {
  try {

    // Check if the user is an admin
    const user = req.user;

    if (!user || user.role !== "admin") {
      throw new Error("Forbidden: Admin role required")
    }

    // If the user is an admin, continue to the next middleware
    next();
  } catch (error) {
    // Handle any errors that might occur
    next(error)

  }
}