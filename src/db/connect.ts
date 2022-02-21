import mongoose, { ConnectOptions } from "mongoose";

const connectDB = (url: string) => {
  return mongoose.connect(url);
};

export default connectDB;
