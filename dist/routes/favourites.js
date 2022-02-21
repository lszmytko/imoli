"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addFavoriteFilms_1 = __importDefault(require("../controllers/addFavoriteFilms"));
const getAllFavorites_1 = __importDefault(require("../controllers/getAllFavorites"));
const getFavorite_1 = __importDefault(require("../controllers/getFavorite"));
const favouritesRouter = (0, express_1.Router)();
favouritesRouter.get("/favorites", getAllFavorites_1.default);
favouritesRouter.get("/favorites/:id", (0, getFavorite_1.default)());
favouritesRouter.get("/favorites/:id/file", (0, getFavorite_1.default)(true));
favouritesRouter.post("/favorites", addFavoriteFilms_1.default);
exports.default = favouritesRouter;
