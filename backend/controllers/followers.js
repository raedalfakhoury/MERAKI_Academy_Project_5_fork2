const { pool } = require("../models/db");
 
const addFollowers = async (req, res) => {
  try {
    const follower_id = req.token.user_id;
    const { followed_id } = req.body;
    const query = `INSERT INTO Follows (follower_id,followed_id) VALUES ($1,$2 ) RETURNING * ;`;
    const data = [follower_id, followed_id];
    const result = await pool.query(query, data);
    res.status(201).json({
      success: true,
      message: "created successfully",
      result: result.rows,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Server error",
      err: error,
    });
  }
};

const getAllFollwers = async (req, res) => {
  try {
    const result = await pool.query(`SELECT Follower.username as FollowerName, Followed.username as FollowedUser,Followed.bio
    FROM Follows  as F
    INNER JOIN Users Follower ON F.follower_id = Follower.id
    INNER JOIN Users Followed ON F.followed_id = Followed.id`);

    res.status(200).json({
      success: true,
      message: "get successfully",
      result: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      err: error,
    });
  }
};

const deleteFollowed = async (req, res) => {
    try {
        const {followed_id} = req.body ;
        const query = `DELETE FROM Follows WHERE followed_id=$1`;
        const data = [followed_id]
      const result = await pool.query(query,data);
      
      res.status(200).json({
        success: true,
        message: "deleted successfully",
        result: result.rows,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: error,
      });
    }
  };


  const suggestedFreings = async (req, res) => {
    // const {id} = req.token.user_id;
    try {
       
      // const data = [id]
      const result = await pool.query(` SELECT *
      FROM Users
      WHERE id != 112
      AND id NOT IN (SELECT followed_id FROM Follows WHERE follower_id = 112);` );
  
      res.status(200).json({ 
        success: true,
        message: "get suggested freinds",
        length: result.rows.length,
        result: result.rows,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: error,
      });
    }
  };
  



module.exports = { addFollowers , getAllFollwers ,deleteFollowed , suggestedFreings};
