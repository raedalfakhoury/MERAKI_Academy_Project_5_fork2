const express = require("express")


const {
    search
} = require("../controllers/SearchNavBar");



const searchRouter = express();


searchRouter.post("/", search);



module.exports = searchRouter;
