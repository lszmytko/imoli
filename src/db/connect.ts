import mongoose, { ConnectOptions } from "mongoose";

const connectDB = (url: string) => {
  return mongoose.connect(url);
};

// {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: true,
//     useUnifiedTopology: true,
// }

export default connectDB;
