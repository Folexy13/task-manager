import { Sequelize } from "sequelize";

// Load environment variables
import dotenv from "dotenv";
dotenv.config();
import { config } from "../Config";

const sequelize = new Sequelize(
  config.dbName, // Database name
  config.dbUser, // Username
  config.dbPass, // Password
  {
    host: config.dbHost, // Database host
    dialect: "postgres", // Database dialect
    port: Number(process.env.DB_PORT) || 5432, // Database port
    logging: true, // Disable logging; set to true for debugging
  }
);

// Test the connection
export async function connectToDB() {
  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}



export default sequelize;
