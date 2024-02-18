const express = require("express");
const PostRouter = express.Router();
// Import articles controllers

const {
  createNewPost,
  getPostById,
  getpostByuserId,
  updatepostById,
  deletePostByUserId,
  getAllPosts,
  deletePostById ,
  getAllPostsMyFriends
} = require("../controllers/post");

const authentication = require("../middlewares/authentication");

PostRouter.post("/create", authentication, createNewPost);

PostRouter.get("/:postbyid", authentication, getPostById);

 
PostRouter.get("/mypost/:userId", authentication, getpostByuserId);
 
 
PostRouter.put("/update/:id", authentication, updatepostById);
PostRouter.delete("/deletePosts/", authentication, deletePostByUserId);
 


PostRouter.get("/allpost", authentication, getAllPosts);

PostRouter.delete("/:id", authentication,deletePostById );


PostRouter.get("/:id/getAllPostsMyFollower", authentication, getAllPostsMyFriends);
 

module.exports = PostRouter;

// test createNewPost
//  http://localhost:5000/post/create
// token :eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJuYW1lIjoiamFtNGFsYmFyaG9vbSIsImltYWdlIjoiaHR0cHM6Ly9pbWFnZXMuY3RmYXNzZXRzLm5ldC9oNmdvbzlndzFoaDYvMnNOWnRGQVdPZFAxbG1RMzNWd1JOMy8yNGU5NTNiOTIwYTljZDBmZjJlMWQ1ODc3NDJhMjQ3Mi8xLWludHJvLXBob3RvLWZpbmFsLmpwZz93PTEyMDAmaD05OTImcT03MCZmbT13ZWJwIiwicm9sZSI6MSwiaXNfZGVsZXRlZCI6MCwiaWF0IjoxNzA3NDg1NzgzLCJleHAiOjE3MDc1MDczODN9.7qARUw50bqXvN9hMNDXN_tYmNpCJiD6omK6Qqn4D1rA

// 1.0{
//     "content": "Creating a storyteller's circle where women share their joy, pain, and experience, the poems in this collection are lyrical vignettes",
//     "media_url": "https://thirdworldpress-us.imgix.net/covers/9780883782231.jpg?auto=format&w=300"
// }
// 2.0{
//
//     "content": "NO ONE CAN BE AT PEACE UNLESS THEY HAVE FREEDOM",
//     "media_url": "https://thirdworldpress-us.imgix.net/covers/9780883782231.jpg?auto=format&w=300"
// }



//! http://localhost:5000/post/1/getAllPostsMyFollower  {API method : get}
/* 
{


}

*/