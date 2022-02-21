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
const CustomError_1 = require("../errors/CustomError");
const filmList_1 = __importDefault(require("../models/filmList"));
const xlsx_1 = __importDefault(require("xlsx"));
const axios_1 = __importDefault(require("axios"));
// getting the name of characters from swapi API
const getCharacterName = (characterName) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield axios_1.default.get(characterName);
    return result.data.name;
});
const getFavorite = (ifExcel = false) => {
    // if Excel not to duplicate functions to get excel or just simple data
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let filmList = yield filmList_1.default.findOne({ _id: req.params.id }); // MongoDB search
            if (!filmList)
                return next(new CustomError_1.CustomError(`Film with ID ${req.params.id} not found`, 400)); // returning error if no films found
            const { _id: filmID, name, films } = filmList; // extracting only fields that interest me
            filmList = {
                filmID,
                name,
                films,
            };
            if (ifExcel) {
                // Part of code for Excel
                let allCharacters = [];
                let titles = [];
                filmList.films.forEach((film) => {
                    allCharacters.push(film.characters);
                    titles.push(film.title + ",");
                });
                allCharacters = allCharacters.flat(); // preparing data for characters
                allCharacters = yield Promise.all(allCharacters.map(getCharacterName)); // getting data from api
                // const worksheet = xlsx.utils.json_to_sheet(jsa);
                let excelData = [];
                for (let character of allCharacters) {
                    excelData.push([character]);
                }
                for (let i = 0; i < titles.length; i++) {
                    excelData[i].push(titles[i]);
                }
                const worksheet = xlsx_1.default.utils.aoa_to_sheet(excelData); // creating Excel file
                return res.status(200).json({
                    msg: "Excel file sent",
                    data: worksheet,
                });
            }
            res.status(200).json({
                msg: "Film founddddd",
                data: filmList,
            });
        }
        catch (e) {
            next(new CustomError_1.CustomError("Something went wrong", 400)); //catching custom error
        }
    });
};
exports.default = getFavorite;
