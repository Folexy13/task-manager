
import { createServer, Server as HTTPServer } from "http";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { config, connectToDB } from "./Config";
import Routes from "./Routes"
import cron from "node-cron";
import { TaskModel } from "./Models";
import { Op } from "sequelize";
import moment from "moment"

const app: Application = express();
const httpServer: HTTPServer = createServer(app);


// Middleware Setup
app.use(morgan("dev"));
app.use(express.json());
app.use(cors({ origin: true }));

// Connect to the database
connectToDB()


// Set up API routes
app.use("/api/v1/", Routes);

const checkTaskStatus = async () => {
    console.log("Cron job is running!");

    try {
        // Get the current time
        const currentTime = new Date();

        // Fetch tasks whose due_date is past the current time
        const overdueTasks = await TaskModel.findAll({
            where: {
                due_date: {
                    [Op.lt]: currentTime, // Due date is less than the current time
                },
                status: {
                    [Op.not]: "Completed", // Optionally ensure it's not already completed
                },
            },
        });

        // Log the overdue tasks
        if (overdueTasks.length > 0) {
            console.log("Overdue tasks:");
            overdueTasks.forEach((task: any) => {
                const formattedDueDate = moment(task.due_date).format("MMMM Do YYYY, h:mm:ss a");
                console.log(`Task ID: ${task.id}, Title: ${task.title}, Due Date: ${formattedDueDate}`);
            });
        } else {
            console.log("No overdue tasks found.");
        }
    } catch (error) {
        console.error("Error checking task statuses:", error);
    }
};

// Schedule the cron job for checking task status (e.g., every minute)
cron.schedule("* * * * *", checkTaskStatus);

httpServer.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
});


