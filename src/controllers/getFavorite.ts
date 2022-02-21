import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";
import FilmList from "../models/filmList";
import xlsx from "xlsx";

const getFavorite = async (
  req: Request,
  res: Response,
  next: NextFunction,
  ifExcel: boolean = false
) => {
  try {
    const film = await FilmList.findOne({ id: req.params.id });
    if (!film)
      return next(
        new CustomError(`Film with ID ${req.params.id} not found`, 400)
      );
    if (ifExcel) {
      let jsa = [film];

      const worksheet = xlsx.utils.json_to_sheet(jsa);

      console.log("sheet", worksheet);

      return res.status(200).json({
        msg: "Excel file sent",
        data: worksheet,
      });
    }
    res.status(200).json({
      msg: "Film found",
      data: film,
    });
  } catch (e) {
    next(new CustomError("Something went wrong", 400));
  }
};

export default getFavorite;
