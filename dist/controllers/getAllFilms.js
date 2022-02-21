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
const axios_1 = __importDefault(require("axios"));
const CustomError_1 = require("../errors/CustomError");
const getAllFilms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let films = yield axios_1.default.get("https://swapi.dev/api/films");
        films = films.data.results.map((film) => {
            const { title, created, episode_id } = film;
            return {
                title,
                created,
                episode_id,
            };
        });
        res.status(200).json({
            msg: "success",
            data: films,
        });
    }
    catch (e) {
        (0, CustomError_1.createCustomError)("Could not get all films", 400); // Creating custom error
    }
});
exports.default = getAllFilms;
