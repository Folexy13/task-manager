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
exports.connectToDB = connectToDB;
const sequelize_1 = require("sequelize");
// Load environment variables
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const Config_1 = require("../Config");
const sequelize = new sequelize_1.Sequelize(Config_1.config.dbName, // Database name
Config_1.config.dbUser, // Username
Config_1.config.dbPass, // Password
{
    host: Config_1.config.dbHost, // Database host
    dialect: "postgres", // Database dialect
    port: Number(process.env.DB_PORT) || 5432, // Database port
    logging: true, // Disable logging; set to true for debugging
});
// Test the connection
function connectToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield sequelize.authenticate();
            console.log("Database connection has been established successfully.");
        }
        catch (error) {
            console.error("Unable to connect to the database:", error);
        }
    });
}
exports.default = sequelize;
