const express = require("express")

const storyRouter = express.Router();
const {
    addStory,removeStory,getAllStoryById
} = require("../controllers/story");

const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");




storyRouter.post("/", authentication,addStory);
storyRouter.delete("/:id", authentication, removeStory);
storyRouter.get("/:id", authentication, getAllStoryById);


module.exports = storyRouter;
