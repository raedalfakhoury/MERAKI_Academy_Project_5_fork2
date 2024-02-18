const { pool } = require("../models/db");

const createNewLike = (req, res) => {
  const post_id = req.params.id;
  const user_id = req.token.user_id;
  const likes_count = 1;

  const checkQuery = `SELECT * FROM Likes WHERE user_id = '${user_id}' AND post_id = '${post_id}';`;
  const checkData = [user_id, post_id];

  pool
    .query(checkQuery)
    .then((checkResult) => {
      if (checkResult.rows.length > 0) {
        // Like already exists, delete the like
        const deleteQuery = `DELETE FROM Likes WHERE user_id = '${user_id}' AND post_id = '${post_id}';`;
        return pool.query(deleteQuery);
      } else {
        // Like doesn't exist, insert a new like
        const insertQuery = `INSERT INTO Likes (user_id, post_id, likes_count) VALUES ($1, $2, $3) RETURNING *;`;
        const insertData = [user_id, post_id, likes_count];
        return pool.query(insertQuery, insertData);
      }
    })
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Like performed successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const counterOfLikes = (req, res) => {
  const post_id = req.params.id;
  const query = `SELECT COUNT(likes_count) FROM Likes WHERE post_id='${post_id}';`;
  pool
    .query(query)
    .then((result) => {
      const likes_counter = result.rows[0].count;
      res.status(200).json({
        success: true,
        message: `All Likes for post: ${post_id} =   ${likes_counter}`,
        LikesCounter: result.rows[0].count * 1,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};
const GetAllUserLikedPost = (req, res) => {
  const id = req.params.id;
  const query = `select Users.profile_picture_url , Users.id , Users.username ,Users.bio from Users 
  join Likes on Likes.user_id = Users.id
  join Posts on  Posts.id = Likes.post_id
  where Posts.id = ${id}`;

  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All user For Likes Post",
        result: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

module.exports = {
  createNewLike,
  counterOfLikes,
  GetAllUserLikedPost,
};
