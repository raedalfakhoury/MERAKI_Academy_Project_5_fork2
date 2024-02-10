const express = require("express");
const ReelsRouter = express.Router();


const {createNewReels,deleteReels}=require("../controllers/Reels");

const authentication = require("../middlewares/authentication");

ReelsRouter.post("/create",authentication,createNewReels );
ReelsRouter.delete("/delete/:id",authentication,deleteReels );










module.exports = ReelsRouter;