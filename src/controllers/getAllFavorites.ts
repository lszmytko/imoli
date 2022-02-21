import { NextFunction, Request, Response } from "express";
import { CustomError, createCustomError } from "../errors/CustomError";
import FilmList from "../models/filmList";

interface queryObject {
  name?: {};
}

const geTAllFavorites = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const nameCriteria: string = req.params.name;
    const queryObject: queryObject = {};
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
      allFavourites = await FilmList.find(queryObject).skip(skip).limit(limit);
    } else {
      allFavourites = await FilmList.find(queryObject);
    }

    if (!allFavourites.length) return next(new CustomError("No films in memory", 404));
    res.status(200).json({
      success: true,
      data: allFavourites,
    });
  } catch (error) {
    next(createCustomError('Something went wrong', 404));
  }
};

export default geTAllFavorites;
