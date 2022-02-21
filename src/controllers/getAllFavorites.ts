import { NextFunction, Request, Response } from "express";
import { nextTick } from "process";
import { CustomError } from "../errors/CustomError";
import FilmList from "../models/filmList";
import xlsx from 'node-xlsx';

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

    const page = Number(req.query.page);
    const limit = Number(req.query.limit);

    const skip = (page - 1) * limit || 1;
    let allFavourites;

    if (page && limit) {
      allFavourites = await FilmList.find(queryObject).skip(skip).limit(limit);
    } else {
      allFavourites = await FilmList.find(queryObject);
    }

    if (!allFavourites.length) return next(new CustomError("No films in memory", 400));
    res.status(200).json({
      success: true,
      data: allFavourites,
    });
    // var buffer = xlsx.build([{name: 'mySheetName', data: allFavourites}], {});
  } catch (error) {
    console.log(error)
  }
};

export default geTAllFavorites;
