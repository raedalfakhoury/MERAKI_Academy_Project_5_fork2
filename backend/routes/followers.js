const express = require("express");
const followersRouter = express.Router();
const { addFollowers, getAllFollwers ,deleteFollowed , suggestedFreings} = require("../controllers/followers");
const authentication = require("../middlewares/authentication");
followersRouter.post("/add",authentication ,addFollowers);
followersRouter.get("/", authentication, getAllFollwers);
followersRouter.get("/suggested" ,  suggestedFreings);
followersRouter.delete("/delete", authentication, deleteFollowed);

module.exports = followersRouter;
