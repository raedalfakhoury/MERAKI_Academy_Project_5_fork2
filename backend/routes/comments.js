const express = require("express");

//controllers
const { createNewComment, getCommentsByPostId } = require("../controllers/comments");

//middleware
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const commentsRouter = express.Router();

commentsRouter.post(
  "/:id",
  
  createNewComment
);
commentsRouter.get("/:id", getCommentsByPostId);

module.exports = commentsRouter;
