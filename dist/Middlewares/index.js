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
exports.verifyToken = verifyToken;
exports.verifyAdmin = verifyAdmin;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("../Models/user.model"));
const Config_1 = require("../Config");
function verifyToken(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const token = ((_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1]) || "";
        if (!token) {
            res.status(401).json({ "Error": "Access denied. No token provided" });
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, Config_1.config.jwtSecret);
            req.user = yield user_model_1.default.findByPk(decoded.id, {
                attributes: { exclude: ['password'] } // Exclude password field
            });
            next();
        }
        catch (error) {
            res.status(400).json({ "Error": "Invalid token" });
        }
    });
}
/**
 * Middleware to verify if the user is authenticated and has an admin role.
 * @param {Request} req - The request object.
 * @param {Response} res - The response object.
 * @param {NextFunction} next - The next middleware function.
 * @returns {void} Calls next() if the user is an admin, or sends a 403 error if not.
 */
function verifyAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if the user is an admin
            const user = req.user;
            if (!user || user.role !== "admin") {
                return res.status(403).json({ error: "Forbidden: Admin role required" });
            }
            // If the user is an admin, continue to the next middleware
            next();
        }
        catch (error) {
            // Handle any errors that might occur
            console.error(error);
            return res.status(500).json({ error: "Server error" });
        }
    });
}
