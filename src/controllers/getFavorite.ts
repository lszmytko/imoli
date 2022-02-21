import { NextFunction, Request, Response, Application } from "express";
import { CustomError } from "../errors/CustomError";
import FilmList from "../models/filmList";
import xlsx from "xlsx";
import axios from "axios";

// getting the name of characters from swapi API
const getCharacterName = async (characterName: string) => {
  const result = await axios.get(characterName);
  return result.data.name;
};

const getFavorite = (ifExcel: boolean = false) => {
  // if Excel not to duplicate functions to get excel or just simple data
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      let filmList = await FilmList.findOne({ _id: req.params.id }); // MongoDB search
      if (!filmList)
        return next(
          new CustomError(`Film with ID ${req.params.id} not found`, 400)
        ); // returning error if no films found

      const { _id: filmID, name, films } = filmList; // extracting only fields that interest me
      filmList = {
        filmID,
        name,
        films,
      };
      if (ifExcel) {
        // Part of code for Excel
        let allCharacters: string[] = [];
        let titles: string[] | string = [];
        filmList.films.forEach(
          (film: { characters: string; title: string }) => {
            allCharacters.push(film.characters);
            (titles as string[]).push(film.title + ",");
          }
        );
        allCharacters = allCharacters.flat(); // preparing data for characters

        allCharacters = await Promise.all(allCharacters.map(getCharacterName)); // getting data from api

        // const worksheet = xlsx.utils.json_to_sheet(jsa);

        let excelData: string[][] = [];

        for (let character of allCharacters) {
          excelData.push([character]);
        }

        for (let i = 0; i < titles.length; i++) {
          excelData[i].push(titles[i]);
        }

        const worksheet = xlsx.utils.aoa_to_sheet(excelData); // creating Excel file

        return res.status(200).json({
          msg: "Excel file sent",
          data: worksheet,
        });
      }
      res.status(200).json({
        msg: "Film founddddd",
        data: filmList,
      });
    } catch (e) {
      next(new CustomError("Something went wrong", 400)); //catching custom error
    }
  };
};

export default getFavorite;
