import mongoose from "mongoose";

const filmListSchema = new mongoose.Schema({
  name: {
    required: [true, "name must be provided"],
    type: String,
  },
  films: {
    type: Array,
    required: true,
  }
});

export default mongoose.model("FilmList", filmListSchema);
