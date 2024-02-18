const express = require("express");
const followersRouter = express.Router();
const { addFollowers, getAllFollwers ,deleteFollowed , suggestedFreings ,getAllFollowing,getAllFollowers} = require("../controllers/followers");
const authentication = require("../middlewares/authentication");
followersRouter.post("/add",authentication ,addFollowers);
// followersRouter.get("/", authentication, getAllFollwers);
followersRouter.get("/suggested",authentication ,  suggestedFreings);
followersRouter.get("/Following/:id" ,  getAllFollowing);
followersRouter.get("/Followers/:id" ,  getAllFollowers);
followersRouter.delete("/delete", authentication, deleteFollowed);

module.exports = followersRouter;
