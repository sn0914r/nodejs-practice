const express = require("express");
const createUser = require("../controllers/createUser.controller");
const verifyUser = require("../controllers/verifyUser.controller");
const makeAdmin = require("../controllers/makeAdmin.controller");

const router = express.Router();

router.post("/create-user", createUser);
router.get("/protected", verifyUser, (req, res) => {
  const PROTECTEDCONTENT = "VENU FAANS ASSOCIATION";

  const user = req["user"];

  console.log(user);

  if (!user) {
    res.statusCode = 400;
    throw new Error("Not Authenticated");
  }

  if (user?.role !== "admin") {
    res.statusCode = 403;
    throw new Error("You must be admin");
  }

  res.status(200).json({
    isSuccess: true,
    protectedContent: PROTECTEDCONTENT,
  });
});

router.post("/make-admin", verifyUser, makeAdmin);

module.exports = router;
