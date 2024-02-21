const { pool } = require("../models/db");

const createLikeComments = (req, res) => {
  const user_id = req.token.user_id;
  const Comment_id = req.params.id;
  const query = `INSERT INTO likeComments (user_id , comment_id ) VALUES ($1, $2) RETURNING *;`;

  const value = [user_id, Comment_id];

  pool
    .query(query, value)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Like comment successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};
const removeLikeComments = (req, res) => {
  const user_id = req.token.user_id;
  const Comment_id = req.params.id;
  const query = ` DELETE FROM likeComments
  WHERE user_id = ${user_id} AND comment_id =${Comment_id}
  RETURNING *;`;



  pool
    .query(query)
    .then((result) => {
      res.status(203).json({
        success: true,
        message: "delete comment successfully",
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

const countLikeComment = (req, res) => {
  //   const user_id = req.token.user_id;
  const Comment_id = req.params.id;

  const query = `SELECT COUNT(comment_id) FROM likeComments WHERE comment_id=${Comment_id}`;

  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "all comment ",
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

module.exports = { createLikeComments, removeLikeComments, countLikeComment };
