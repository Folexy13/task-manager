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
router.route("/").get(Middlewares_1.verifyToken, Controllers_1.ChatController.FetchChats);
router
    .route(`/group`)
    // .post(validate(ROUTES.CHAT),verifyToken, ChatController.CreateGroupChat)
    .post(Middlewares_1.verifyToken, Controllers_1.ChatController.CreateGroupChat)
    .patch(Middlewares_1.verifyToken, Controllers_1.ChatController.RenameGroup)
    .put(Middlewares_1.verifyToken, Controllers_1.ChatController.AddToGroup);
// .delete(verifyToken, ChatController.RemoveFromGroup);
router
    .route(`/`)
    // .get(chatController.InitiateChatService)
    // .post(validate(ROUTES.CHAT), verifyToken, ChatController.CreateGroupChat);
    .post((0, Validations_1.default)(Helpers_1.ROUTES.CHAT), Middlewares_1.verifyToken, Controllers_1.ChatController.CreateGroupChat);
router
    .route("/message")
    .post((0, Validations_1.default)(Helpers_1.ROUTES.MESSAGE), Middlewares_1.verifyToken, Controllers_1.ChatController.SendMessage)
    .patch(Middlewares_1.verifyToken, Controllers_1.ChatController.GetAllMessages);
//Story Routes
router
    .route("/story")
    .post((0, Validations_1.default)(Helpers_1.ROUTES.STORY), Middlewares_1.verifyToken, Controllers_1.ChatController.CreateStory)
    .get(Middlewares_1.verifyToken, Controllers_1.ChatController.GetStories) //user to fetch his stories
    // .put(verifyToken, ChatController.View) //user to view  story
    .patch(Middlewares_1.verifyToken, Controllers_1.ChatController.GetStories) //user to fetch other stories
    .delete(Middlewares_1.verifyToken, Controllers_1.ChatController.DeleteStory);
//Dates Routes
//Cliques Routes
router
    .route("/clique")
    .post(Middlewares_1.verifyToken, (0, Validations_1.default)(Helpers_1.ROUTES.CLIQUE), Controllers_1.ChatController.CreateClique)
    .get(Middlewares_1.verifyToken, Controllers_1.ChatController.GetAllCliques)
    .put(Middlewares_1.verifyToken, Controllers_1.ChatController.JoinClique)
    .patch(Middlewares_1.verifyToken, Controllers_1.ChatController.ExitClique) //leave clique
    .delete(Middlewares_1.verifyToken, Controllers_1.ChatController.ExitClique); //remove from clique
router.route("/clique/:id").delete(Middlewares_1.verifyToken, Controllers_1.ChatController.DeleteClique);
//Party Routes
router
    .route("/clique")
    .post(Middlewares_1.verifyToken, (0, Validations_1.default)(Helpers_1.ROUTES.PARTY), Controllers_1.ChatController.CreateParty)
    .get(Middlewares_1.verifyToken, Controllers_1.ChatController.GetParties)
    .patch(Middlewares_1.verifyToken, Controllers_1.ChatController.GetParty)
    .delete(Middlewares_1.verifyToken, Controllers_1.ChatController.ExitParty); //leave party
exports.default = router;
