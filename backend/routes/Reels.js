const express = require("express");
const ReelsRouter = express.Router();


const {createNewReels}=require("../controllers/Reels");

const authentication = require("../middlewares/authentication");

ReelsRouter.post("/create",authentication,createNewReels );










module.exports = ReelsRouter;