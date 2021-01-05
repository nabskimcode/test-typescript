import express from "express";
import path from "path";
import { json } from "body-parser";
import "express-async-errors";
import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { datafetchRouter } from "./routes/datafetch";
import { errorHandler } from "./middleware/error-handler";
import { NotFoundError } from "./errors/not-found-error";
//import mongoose, { mongo } from "mongoose";
import cookieSession from "cookie-session";
//import {scrypt, randomBytes} from "crypto"
const dotenv = require("dotenv");

// Load env vars
dotenv.config({ path: "./config/config.env" });
const app = express();
// to make express aware that it is behind a proxy of ingress nginx and to trust traffic
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(datafetchRouter);

app.all("*", async (req, res, next) => {
  // next(new NotFoundError());
  throw new NotFoundError();
});

//middlwware
app.use(errorHandler);

export { app };
