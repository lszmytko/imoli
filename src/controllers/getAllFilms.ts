import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { createCustomError } from "../errors/CustomError";

const getAllFilms = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let films = await axios.get("https://swapi.dev/api/films");

    films = films.data.results.map((film: any) => {
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
  } catch (e) {
    createCustomError("Could not get all films", 500);
  }
};

export default getAllFilms;
