import express from "express";

//middleware for the route
import { currentUser } from "../middleware/current-user";
//import { requireAuth } from "../middleware/require-auth";

const router = express.Router(); //A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.

router.get("/api/users/currentuser", currentUser, (req, res) => {
  //if (!req.session || !req.session.jwt) {
  // the ? symbol is to check the internal property exist or not
  // if (!req.session?.jwt) {
  //   return res.send({ currentUser: null });
  // }

  // try {
  //   //extract and decode information out of jsonwebtoken
  //   const payload = jwt.verify(req.session.jwt, process.env.JWT_KEY!);
  //   res.send({ currentUser: payload });
  // } catch (err) {
  //   res.send({ currentUser: null });
  // }

  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
