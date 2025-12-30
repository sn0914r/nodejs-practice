const express = require("express");
const router = express.Router();
require("dotenv").config();

/* ===============================================
POST /register route imports

----------------- Middlewares -----------------
validate - validate the request body
tokenGeneration - generates jwt token
storeInDB - store data in database

----------------- Controllers -----------------
registerController - sends the jwt token to client
/* ===============================================*/
const {
  validate,
  tokenGeneration,
  StoreInDB,
} = require("../middlewares/register.middlewares");
const { registerController } = require("../controllers/register.controllers");



/* ===============================================
GET /profile route imports

----------------- Middlewares -----------------
authorization - decodes the token and checks if the user is authorized

----------------- Controllers -----------------
profileController - sends the user profile to client
/* ===============================================*/
const authorization = require("../middlewares/authorization.middleware");
const profileController = require("../controllers/profile.controller");

const SECRET_KEY = process.env.SECRET_KEY || "TIGOR";

router.post(
  "/register",
  validate,
  StoreInDB,
  tokenGeneration(SECRET_KEY, "10m"),
  registerController
);


router.get("/profile", authorization, profileController);

module.exports = router;
