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
const filmList_1 = __importDefault(require("../models/filmList"));
const CustomError_1 = require("../errors/CustomError");
const addFavoriteFilms = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const IDlist = [...new Set(req.body.list)]; // extracting only unique IDs
        const name = req.body.name;
        let filmListInDatabase = yield filmList_1.default.findOne({ name });
        if (filmListInDatabase)
            return res.status(400).send("List with such name already exists"); // checking if list with such name already exists
        let filmData = [];
        for (const filmId of IDlist) {
            const tempData = yield axios_1.default.get(`https://swapi.dev/api/films/${filmId}`); // Fetching data and adding to array
            const { title, created, characters } = tempData.data;
            const subset = { title, characters, created };
            filmData = [...filmData, subset];
        }
        yield filmList_1.default.create({
            name,
            films: filmData,
        });
        res.status(200).json({
            msg: "success"
        });
    }
    catch (e) {
        next((0, CustomError_1.createCustomError)("Something went wrong", 400));
    }
});
exports.default = addFavoriteFilms;
