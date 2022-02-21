"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const filmListSchema = new mongoose_1.default.Schema({
    name: {
        required: [true, "name must be provided"],
        type: String,
    },
    films: {
        type: Array,
        required: true,
    }
});
exports.default = mongoose_1.default.model("FilmList", filmListSchema);
