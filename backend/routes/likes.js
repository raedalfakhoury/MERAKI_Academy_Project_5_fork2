const express = require("express");

//controllers
const {
  createNewLike,counterOfLikes
} = require("../controllers/likes");

//middleware
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const likesRouter = express.Router();

likesRouter.post("/:id",authentication,createNewLike);
likesRouter.get("/:id",counterOfLikes)

module.exports = likesRouter;