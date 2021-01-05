/*Abstract classes are base classes from which other classes 
may be derived.an abstract class may contain implementation details 
for its members. The abstract keyword is used to define abstract classes as well as abstract methods within an abstract class.
Methods within an abstract class that are marked as abstract do not contain an implementation and must be implemented in derived classes.
*/
export abstract class CustomError extends Error {
  abstract statusCode: number;
  constructor(message: string) {
    super(message); // same as throw new Error()

    Object.setPrototypeOf(this, CustomError.prototype);
  }
  abstract serializeErrors(): { message: string; field?: string }[];
}
