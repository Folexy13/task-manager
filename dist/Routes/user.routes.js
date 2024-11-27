"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Controllers_1 = require("../Controllers");
const express_1 = require("express");
const Helpers_1 = require("../Helpers");
const Validations_1 = __importDefault(require("../Validations"));
const Middlewares_1 = require("../Middlewares");
const router = (0, express_1.Router)();
router
    .route(`/login`)
    .post((0, Validations_1.default)(Helpers_1.ROUTES.LOGIN), Controllers_1.UserController.LoginUser);
router.route("/")
    .post((0, Validations_1.default)(Helpers_1.ROUTES.USER), Controllers_1.UserController.CreateUser)
    .get(Controllers_1.UserController.GetAllUsers);
router
    .route("/:id")
    .get(Middlewares_1.verifyToken, Controllers_1.UserController.GetUserById)
    .put(Middlewares_1.verifyToken, Controllers_1.UserController.UpdateUser)
    .patch(Middlewares_1.verifyToken, Middlewares_1.verifyAdmin, Controllers_1.UserController.setRole)
    .delete(Middlewares_1.verifyToken, Middlewares_1.verifyAdmin, Controllers_1.UserController.DeleteUser);
exports.default = router;
