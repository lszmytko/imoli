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
const geTAllFavorites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const nameCriteria = req.params.name;
        const queryObject = {};
        const regexOptions = {
            $regex: nameCriteria,
            $options: "i",
        };
        if (nameCriteria) {
            queryObject.name = regexOptions;
        }
        const page = Number(req.query.page); // Preparing pagination
        const limit = Number(req.query.limit);
        const skip = (page - 1) * limit || 1;
        let allFavourites;
        if (page && limit) {
            allFavourites = yield filmList_1.default.find(queryObject).skip(skip).limit(limit);
        }
        else {
            allFavourites = yield filmList_1.default.find(queryObject);
        }
        if (!allFavourites.length)
            return next(new CustomError_1.CustomError("No films in memory", 404));
        res.status(200).json({
            success: true,
            data: allFavourites,
        });
    }
    catch (error) {
        next((0, CustomError_1.createCustomError)('Something went wrong', 404));
    }
});
exports.default = geTAllFavorites;
