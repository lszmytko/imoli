import { NextFunction, Request, Response } from "express";
import { CustomError } from "../errors/CustomError";
import FilmList from "../models/filmList";
import xlsx from 'xlsx';



const getFavoriteWithExcel = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const film = await FilmList.findOne({ id: req.params.id });
    if (!film) return next(new CustomError(`Film with ID ${req.params.id} not found`, 400));

    let jsa = [film];
    
    const worksheet = xlsx.utils.json_to_sheet(jsa);
    
    console.log('sheet', worksheet);
    

    res.status(200).json({
      msg: "Film found",
      data: worksheet,
    });
  } catch (e) {
    console.log(e)
    next(new CustomError('Something went wrong', 400));
  }
};

export default getFavoriteWithExcel;
