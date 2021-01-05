import { CustomError } from "./custom-error";

export class DatabaseConnectionError extends CustomError {
  statusCode = 500;
  reason = "Error connecting to the database"; //property to the class

  constructor() {
    super("Error connecting to db");

    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
  //method
  serializeErrors() {
    return [{ message: this.reason }];
  }
}
