import axios from "axios";
import { Request, Response } from "express";
import FilmList from "../models/filmList";
import mongoose from "mongoose";

const addFavoriteFilms = async (req: Request, res: Response) => {
  try {
    const IDlist = [...new Set(req.body.list)]; // extracting only unique IDs
    const name = req.body.name;

    let filmListInDatabase = await FilmList.findOne({ name });
    if (filmListInDatabase)
      return res.status(400).send("List with such name already exists");

    let filmData: Array<{}> = [];

    for (const filmId of IDlist) {
      const tempData = await axios.get(`https://swapi.dev/api/films/${filmId}`);
      const { title, created, characters } = tempData.data;
      const subset = { title, characters, created };

      filmData = [...filmData, subset];
    }

    await FilmList.create({
      name,
      films: filmData,
    });

    res.status(200).json({
      msg: "success",
      data: filmData,
    });
  } catch (e) {
    res.status(400).json({
      msg: "Something went wrong",
      
    });
  }
};

export default addFavoriteFilms;
