"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Middlewares_1 = require("../Middlewares");
const Validations_1 = __importDefault(require("../Validations"));
const Helpers_1 = require("../Helpers");
const Controllers_1 = require("../Controllers");
const router = (0, express_1.Router)();
router
    .route("/")
    .post((0, Validations_1.default)(Helpers_1.ROUTES.GIFT), Middlewares_1.verifyToken, Controllers_1.GiftController.CreateGift)
    .get(Middlewares_1.verifyToken, Controllers_1.GiftController.GetGifts)
    .put(Middlewares_1.verifyToken, Controllers_1.GiftController.UpdateGift)
    .patch(Middlewares_1.verifyToken, Controllers_1.GiftController.GetGift)
    .delete(Middlewares_1.verifyToken, Controllers_1.GiftController.DeleteGift);
router
    .route("/handle")
    .put(Middlewares_1.verifyToken, Controllers_1.GiftController.HandleGiftResponse)
    .delete(Middlewares_1.verifyToken, Controllers_1.GiftController.DeleteAllGifts);
