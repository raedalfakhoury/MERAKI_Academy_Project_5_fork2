const { pool } = require("../models/db");
 
const createNewReels = (req, res) => {

    const {description  , video_url } =req.body
    const user_id = req.token.user_id;
    const query =`INSERT INTO Reels (user_id, description, video_url ) 
    VALUES ($1, $2, $3) 
    RETURNING id, user_id, description, video_url, creation_date` 
    ;
    const data =[user_id, description, video_url] ;
    
    pool
    .query(query,data)
    .then((result)=>{
        res.status(201).json({
            success:true ,
            message:"Reel created successfully ",
            result:result.rows[0], 
        });
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({
            success:false ,
            message:"server error",
            result:err.message, 
        })

    })

}











module.exports = {createNewReels,}