const { pool } = require("../models/db");
/*
SELECT Users.username,
follower_id AS UsersID, 'FOLLOWER' AS relationship FROM Follows JOIN Users
ON Follows.follower_id = Users.id 
UNION 

SELECT Users.username, followed_id AS UsersID, 'FOLLOWING '  AS relationship FROM Follows JOIN Users
ON Follows.followed_id = Users.id ;
 
*/
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
      result: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      err: error,
    });
  }
};

module.exports = { addFollowers };
