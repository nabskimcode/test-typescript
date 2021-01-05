import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;

  // method for creating and initializing objects created within a class.
  constructor(public message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
