import express from "express";
import * as dotenv from "dotenv";
import notFound from "./middleware/notFound";
import connectDB from "./db/connect";
import favouritesRouter from "./routes/favourites";
import errorHandlerMiddleware from "./middleware/errorHandler";
import filmList from "./models/filmList";
import getAllFilms from "./controllers/getAllFilms";

dotenv.config();

const app = express();

// middleware

app.use(express.json());

// app.use("/");

// HOME ROUTE

app.get("/", getAllFilms);

// ROUTER

app.use("/", favouritesRouter);
//ERROR HANDLER

app.use(errorHandlerMiddleware);

const PORT = process.env.PORT || 3000;

const start = async (): Promise<void> => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    // await filmList.deleteMany({});
    app.listen(PORT, () => {
      console.log("APP listening");
    });
  } catch (e) {
    console.log(e);
  }
};

start();
