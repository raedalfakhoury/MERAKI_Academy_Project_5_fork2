const express = require("express")

const searchRouter = express.Router();
const {
    search
} = require("../controllers/SearchNavBar");






searchRouter.post("/", search);



module.exports = searchRouter;
