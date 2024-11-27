"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
dotenv_1.default.config();
/**
 * Get the application configuration from environment variables.
 * @returns {Config} The configuration object.
 */
var getConfig = function () {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    return {
        // Define database URL based on the environment.
        dbName: String(process.env.ENVIRONMENT) === "developement"
            ? String((_a = process.env.DB_DEV_NAME) === null || _a === void 0 ? void 0 : _a.trim())
            : String((_b = process.env.DB_PROD_NAME) === null || _b === void 0 ? void 0 : _b.trim()),
        dbUser: String(process.env.ENVIRONMENT) === "developement"
            ? String((_c = process.env.DB_DEV_USER) === null || _c === void 0 ? void 0 : _c.trim())
            : String((_d = process.env.DB_PROD_USER) === null || _d === void 0 ? void 0 : _d.trim()),
        dbPass: String(process.env.ENVIRONMENT) === "developement"
            ? String((_e = process.env.DB_DEV_PASS) === null || _e === void 0 ? void 0 : _e.trim())
            : String((_f = process.env.DB_PROD_PASS) === null || _f === void 0 ? void 0 : _f.trim()),
        dbHost: String(process.env.ENVIRONMENT) === "developement"
            ? String((_g = process.env.DB_DEV_HOST) === null || _g === void 0 ? void 0 : _g.trim())
            : String((_h = process.env.DB_PROD_HOST) === null || _h === void 0 ? void 0 : _h.trim()),
        environment: process.env.ENVIRONMENT ? String(process.env.ENVIRONMENT) : "",
        jwtSecret: process.env.JWT_SECRET_DEV ? String(process.env.JWT_SECRET_DEV) : String(process.env.JWT_SECRET_PROD),
        // Application port with a default value.
        port: process.env.PORT ? String(process.env.PORT) : "8002",
    };
};
/**
 * Validate the keys in the configuration object to ensure they are defined.
 * @param {Config} config - The application configuration object.
 * @returns {Config} The sanitized configuration object.
 * @throws {Error} If any required keys are missing.
 */
var getSanitizedConfig = function (config) {
    for (var _i = 0, _a = Object.entries(config); _i < _a.length; _i++) {
        var _b = _a[_i], key = _b[0], value = _b[1];
        if (value === undefined) {
            throw new Error("Missing key ".concat(key, " in .env"));
        }
    }
    return config;
};
// Get the configuration and sanitize it.
var config = getConfig();
var sanitizedConfig = getSanitizedConfig(config);
exports.default = sanitizedConfig;
