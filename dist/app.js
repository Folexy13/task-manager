"use strict";
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
httpServer.listen(Config_1.config.port, () => {
    console.log(`Server listening on port ${Config_1.config.port}`);
});
