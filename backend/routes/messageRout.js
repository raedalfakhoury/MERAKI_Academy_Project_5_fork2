const express = require("express")
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const {createNewMessage,getAllMessage} = require("../controllers/messageControll")
const routerMessage = express.Router()



routerMessage.post("/send",authentication,createNewMessage)
routerMessage.get("/",authentication,getAllMessage)






module.exports = routerMessage