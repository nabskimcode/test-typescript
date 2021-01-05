import mongoose, { mongo } from "mongoose";
import { app } from "./app";

//start up mongodb
const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be define");
  }

  try {
    await mongoose.connect("mongod-srv link", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to Mongodb");
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log("Listening onn port 3000!!!");
  });
};

start();
