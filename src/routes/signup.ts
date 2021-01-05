import express, { Request, Response } from "express";
import { body /*validationResult*/ } from "express-validator";
import jwt from "jsonwebtoken";

import { validateRequest } from "../middleware/validate-request";
import { User } from "../models/user";
import { BadRequestError } from "../errors/bad-request-error";
const router = express.Router(); //A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    // middleware for express-validatior
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // const errors = validationResult(req);

    // if (!errors.isEmpty()) {
    //   // return res.status(400).send(errors.array());
    //   //throw new Error("Invalid email or password");
    //   throw new RequestValidationError(errors.array());
    // }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // console.log("Email in use");
      // return res.send({});

      throw new BadRequestError("Email in use");
    }
    // create a new User document
    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      //"asdf"
      process.env.JWT_KEY! // non-null assertion operator. It is a way to tell the compiler "this expression cannot be null or undefined and can only work when run in pods not local
    );

    // Store it on session object it will be a string by cookies session then send the cookie back to users
    //typescript doest not assume this is tied to an object
    // req.session.jwt = userJwt;
    req.session = {
      jwt: userJwt,
    };
    res.status(201).send(user);
  }
);
export { router as signupRouter };
