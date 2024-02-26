const express = require("express");
const likesRouter = express.Router();
//controllers
const {
  createNewLike,counterOfLikes,GetAllUserLikedPost
} = require("../controllers/likes");

//middleware
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");



likesRouter.post("/:id",authentication,createNewLike);
likesRouter.get("/:id",authentication,counterOfLikes)
likesRouter.get("/AllLikeByPost/:id",authentication,GetAllUserLikedPost)

module.exports = likesRouter;