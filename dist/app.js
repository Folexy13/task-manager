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
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const Config_1 = require("./Config");
const Routes_1 = __importDefault(require("./Routes"));
const node_cron_1 = __importDefault(require("node-cron"));
const Models_1 = require("./Models");
const sequelize_1 = require("sequelize");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
// Middleware Setup
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: true }));
// Connect to the database
(0, Config_1.connectToDB)();
// Set up API routes
app.use("/api/v1/", Routes_1.default);
const checkTaskStatus = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Cron job is running!");
    try {
        // Get the current time
        const currentTime = new Date();
        // Fetch tasks whose due_date is past the current time
        const overdueTasks = yield Models_1.TaskModel.findAll({
            where: {
                due_date: {
                    [sequelize_1.Op.lt]: currentTime, // Due date is less than the current time
                },
                status: {
                    [sequelize_1.Op.not]: "Completed", // Optionally ensure it's not already completed
                },
            },
        });
        // Log the overdue tasks
        if (overdueTasks.length > 0) {
            console.log("Overdue tasks:");
            overdueTasks.forEach((task) => {
                console.log(`Task ID: ${task.id}, Title: ${task.title}, Due Date: ${task.due_date}`);
            });
        }
        else {
            console.log("No overdue tasks found.");
        }
    }
    catch (error) {
        console.error("Error checking task statuses:", error);
    }
});
// Schedule the cron job for checking user (e.g., every minute)
node_cron_1.default.schedule("* * * * *", checkTaskStatus);
httpServer.listen(Config_1.config.port, () => {
    console.log(`Server listening on port ${Config_1.config.port}`);
});
