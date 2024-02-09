const express = require("express")


const {
    addStory,removeStory
} = require("../controllers/story");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

const storyRouter = express();


storyRouter.post("/", authentication,addStory);
storyRouter.delete("/", authentication, removeStory);


module.exports = storyRouter;
