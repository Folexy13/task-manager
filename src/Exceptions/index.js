"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFound = void 0;
var Config_1 = require("../Config");
var notFound = function (req, res, next) {
    var error = new Error("Not Found - ".concat(req.originalUrl));
    res.status(404);
    next(error);
};
exports.notFound = notFound;
var errorHandler = function (err, req, res, next) {
    var statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: Config_1.config.environment !== "developement" ? null : err.stack,
    });
};
exports.errorHandler = errorHandler;
