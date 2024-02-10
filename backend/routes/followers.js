const express = require("express");
const followersRouter = express.Router();
const { addFollowers, getAllFollwers } = require("../controllers/followers");
const authentication = require("../middlewares/authentication");
followersRouter.post("/add",authentication ,addFollowers);
followersRouter.get("/", authentication, getAllFollwers);

module.exports = followersRouter;
