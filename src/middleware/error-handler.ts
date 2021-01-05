import { Request, Response, NextFunction } from "express";
// import { DatabaseConnectionError } from "../errors/database-connection-error";
// import { RequestValidationError } from "../errors/request-validation-error";
import { CustomError } from "../errors/custom-error";

// express error handler by having 4 args
export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // if (err instanceof RequestValidationError) {
  //   // console.log("Handling this error as a request validation error");
  //   // const formattedErrors = err.errors.map((error) => {
  //   //   return { message: error.msg, field: error.param };
  //   // });

  //   // console.log("err stats", err);

  //   return res.status(err.statusCode).send({
  //     errors: err.serializeErrors(),
  //   });
  // }

  // if (err instanceof DatabaseConnectionError) {
  //   //console.log("Handling this error as a db connection error");
  //   return res.status(err.statusCode).send({
  //     // errors: [
  //     //   {
  //     //     message: err.reason,
  //     //   },
  //     // ],

  //     errors: err.serializeErrors(),
  //   });
  // }
  // console.log("Something went wrong", err);

  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(400).send({
    errors: [
      {
        message: "Something went wrong",
      },
    ],
  });
};
