const express = require("express");
const LikeCommentsR = express.Router();
const { createLikeComments ,removeLikeComments,countLikeComment} = require("../controllers/likeComment");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

LikeCommentsR.post("/:id", authentication, createLikeComments);
LikeCommentsR.delete("/:id", authentication, removeLikeComments);
LikeCommentsR.get("/:id", countLikeComment);









module.exports =LikeCommentsR
