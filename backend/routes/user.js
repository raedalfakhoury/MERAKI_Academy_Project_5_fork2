const express = require("express")

const {register,login,deleteUser,updateUser} =require("../controllers/user")

const userRouter  = express()

userRouter.post("/register",register)
userRouter.post("/login",login)
userRouter.delete("/delete",deleteUser)
userRouter.put("/update",updateUser)



module.exports = userRouter