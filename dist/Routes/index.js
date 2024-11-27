"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Helpers_1 = require("../Helpers");
const task_routes_1 = __importDefault(require("./task.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const request_public_ip_1 = require("request-public-ip");
const Exceptions_1 = require("../Exceptions");
const router = (0, express_1.Router)();
router.get("/", (req, res) => {
    // Get the user's IP address from the request object
    const userIPAddress = (0, request_public_ip_1.getClientPublicIpFromHeaders)(req.headers);
    // Send a response with the IP address and "Server is live" message
    res.json({
        message: "Task Manager Server is live",
        userIPAddress,
    });
});
//import other router from their controller
router.use(Helpers_1.ROUTES.TASK, task_routes_1.default);
router.use(Helpers_1.ROUTES.USER, user_routes_1.default);
router.use(Exceptions_1.notFound);
router.use(Exceptions_1.errorHandler);
exports.default = router;
