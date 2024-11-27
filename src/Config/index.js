"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDB = exports.config = void 0;
var env_config_1 = require("./env.config");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return env_config_1.default; } });
var db_config_1 = require("./db.config");
Object.defineProperty(exports, "connectToDB", { enumerable: true, get: function () { return db_config_1.connectToDB; } });