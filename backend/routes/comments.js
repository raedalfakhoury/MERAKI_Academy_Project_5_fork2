const express = require("express");
const commentsRouter = express.Router();
//controllers
const {
  createNewComment,
  getCommentsByPostId,
  updateCommentsById,
  deleteCommentsById,
  // getCommentsAndLikeByPostId
} = require("../controllers/comments");

//middleware
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");



commentsRouter.post("/:id",authentication,createNewComment);
commentsRouter.get("/:id",authentication ,getCommentsByPostId);

// commentsRouter.get("/:id/withcomment",authentication ,getCommentsAndLikeByPostId);

commentsRouter.put("/:id", authentication,updateCommentsById);

commentsRouter.delete("/:id",deleteCommentsById)


module.exports = commentsRouter;
