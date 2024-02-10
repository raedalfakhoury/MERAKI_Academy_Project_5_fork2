const express = require("express");
const ReelsRouter = express.Router();


const {createNewReels,deleteReels,getReelsByUser}=require("../controllers/Reels");

const authentication = require("../middlewares/authentication");

ReelsRouter.post("/create",authentication,createNewReels );
ReelsRouter.delete("/delete/:id",authentication,deleteReels );



ReelsRouter.get ("/:id",authentication,getReelsByUser)







module.exports = ReelsRouter;