import express, { Request, Response } from "express";
import { BadRequestError } from "../errors/bad-request-error";
import { IGetUserAuthInfoRequest } from "../middleware/dataFetch";
import { User } from "../models/user";
const router = express.Router();

interface dataAtt {
  published: boolean;
}

router.get("/api/users/data", async (req: Request, res: Response) => {
  const match = <dataAtt>{};
  console.log(req.query);

  if (req.query.published) {
    match.published = req.query.published === "true";
  }

  try {
    const data = await User.find({}).populate("emails");
    res.status(200).send(data);
  } catch (error) {
    throw new BadRequestError("Invalid data");
  }
});

export { router as datafetchRouter };
