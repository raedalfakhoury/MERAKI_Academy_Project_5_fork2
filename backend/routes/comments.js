const express = require("express");

//controllers
const {
  createNewComment,
  getCommentsByPostId,
  updateCommentsById
} = require("../controllers/comments");

//middleware
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const commentsRouter = express.Router();

commentsRouter.post("/:id",authentication,createNewComment);
commentsRouter.get("/:id", getCommentsByPostId);
commentsRouter.put("/:id", authentication,updateCommentsById);
module.exports = commentsRouter;
