import { Application, Router } from "express";
import addFavoriteFilms from "../controllers/addFavoriteFilms";
import geTAllFavorites from "../controllers/getAllFavorites";
import getAllFilms from "../controllers/getAllFilms";
import getFavorite from "../controllers/getFavorite";

const favouritesRouter: Router = Router();

favouritesRouter.get("/favorites", geTAllFavorites);
favouritesRouter.get("/favorites/:id", getFavorite());
favouritesRouter.get("/favorites/:id/file", getFavorite(true));

favouritesRouter.post("/favorites", addFavoriteFilms);

export default favouritesRouter;
