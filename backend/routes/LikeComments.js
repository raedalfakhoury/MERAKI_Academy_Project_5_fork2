const express = require("express");
const LikeCommentsR = express.Router();
const { createLikeComments ,removeLikeComments,countLikeComment,getAllLikesComments} = require("../controllers/likeComment");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

LikeCommentsR.post("/:id", authentication, createLikeComments);
LikeCommentsR.delete("/:id", authentication, removeLikeComments);
LikeCommentsR.get("/:id", countLikeComment);
LikeCommentsR.get("/:id/xx", authentication,getAllLikesComments);









module.exports =LikeCommentsR
