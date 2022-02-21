import axios from "axios";
import { NextFunction, Request, Response } from "express";
import FilmList from "../models/filmList";
import { createCustomError } from "../errors/CustomError";

const addFavoriteFilms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const IDlist = [...new Set(req.body.list)]; // extracting only unique IDs
    const name = req.body.name;

    let filmListInDatabase = await FilmList.findOne({ name });
    if (filmListInDatabase)
      return res.status(400).send("List with such name already exists"); // checking if list with such name already exists

    let filmData: Array<{}> = [];

    for (const filmId of IDlist) {
      const tempData = await axios.get(`https://swapi.dev/api/films/${filmId}`); // Fetching data and adding to array
      const { title, created, characters } = tempData.data;
      const subset = { title, characters, created };

      filmData = [...filmData, subset];
    }

    await FilmList.create({
      name,
      films: filmData,
    });

    res.status(200).json({
      msg: "success"
    });
  } catch (e) {
    next(createCustomError("Something went wrong", 400));
  }
};

export default addFavoriteFilms;
