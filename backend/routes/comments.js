const express = require("express");

//controllers
const {
  createNewComment,
  getCommentsByPostId,
  updateCommentsById,
  deleteCommentsById
} = require("../controllers/comments");

//middleware
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const commentsRouter = express.Router();

commentsRouter.post("/:id",authentication,createNewComment);
commentsRouter.get("/:id",authentication ,getCommentsByPostId);

commentsRouter.put("/:id", authentication,updateCommentsById);

commentsRouter.delete("/:id",deleteCommentsById)


module.exports = commentsRouter;
