
import { createServer, Server as HTTPServer } from "http";
import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import { config, connectToDB } from "./Config";
import Routes from "./Routes"
import cron from "node-cron";

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

const checkTaskStatus = () => {
    console.log("Cron job is running!");
    // Add your logic here
};

// Schedule the cron job for checking user (e.g., every minute)
cron.schedule("* * * * *", checkTaskStatus);

httpServer.listen(config.port, () => {
    console.log(`Server listening on port ${config.port}`);
});


