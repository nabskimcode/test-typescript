import express from "express";

const router = express.Router(); //A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.

router.post("/api/users/signout", (req, res) => {
  //destroy session
  req.session = null;

  res.send({});
});

export { router as signoutRouter };
