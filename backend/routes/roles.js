const express = require("express");
const { createNewRole, createNewPermission,createNewRolePermission } = require("../controllers/roles");
// Create roles router
const roleRouter = express.Router();

roleRouter.post("/", createNewRole);
roleRouter.post("/permission", createNewPermission);
roleRouter.post("/role_permission", createNewRolePermission);

module.exports = roleRouter;

       // id:1        id:2             id:3      id:4           id:5            id:6          id:7          id: 8           id: 9
    // create_post  create_comment create_story create_reels  delete_post  delete_story   delete_comment delete_my_user update_my_user 

    // update_post  update_comment  update_comment

 
 
    /* 

create Roles =>  test 
!api => http://localhost:5000/roles

!body =>
{
    "role" : "user"
}

*/