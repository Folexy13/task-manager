"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var express_1 = require("express");
var cors_1 = require("cors");
var morgan_1 = require("morgan");
var Config_1 = require("./Config");
var app = (0, express_1.default)();
var httpServer = (0, http_1.createServer)(app);
// Middleware Setup
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: true }));
// Connect to the database
(0, Config_1.connectToDB)();
app.get("/", function (req, res) {
    res.json({ status: true, message: "Task manager server is live!" });
});
// Set up API routes
// app.use("/api/v1/seeka", Routes);
httpServer.listen(Config_1.config.port, function () {
    console.log("Server listening on port ".concat(Config_1.config.port));
});
