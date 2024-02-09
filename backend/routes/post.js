const express = require("express");
const PostRouter = express.Router();
// Import articles controllers

const {createNewPost} = require('../controllers/post');
const authentication =require("../middlewares/authentication")
PostRouter.post("/create",authentication,createNewPost);














module.exports = PostRouter;




// test createNewPost
//  1.0{
//     "user_id": 1,
//     "content": "Ballers of the New School uses American sports culture to challenge and explore notions of race in America",
//     "media_url": "https://trend.nl7za.com/wp-content/uploads/2023/10/image001-12.jpg"
// }
// 2.0{
//     "user_id": 5,
//     "content": "Creating a storyteller's circle where women share their joy, pain, and experience, the poems in this collection are lyrical vignettes",
//     "media_url": "https://thirdworldpress-us.imgix.net/covers/9780883782231.jpg?auto=format&w=300"
// }
//3.0 {
//     "user_id": 12,
//     "content": "NO ONE CAN BE AT PEACE UNLESS THEY HAVE FREEDOM",
//     "media_url": "https://thirdworldpress-us.imgix.net/covers/9780883782231.jpg?auto=format&w=300"
// }