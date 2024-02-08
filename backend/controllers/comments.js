const {pool} = require("../models/db");

const createNewComment = (req, res) => {
  const post_id = req.params.id;
  const user_id = req.token.user_id;
  const { content } = req.body;
//   const currentDate = new Date();
//   const created_at = currentDate.toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' +0000';
  const query = `INSERT INTO Comments (user_id,post_id,content) VALUES ($1,$2,$3) RETURNING *`;
  const data = [user_id,post_id,content];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Comment created successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
        console.log(err);
      res.status(404).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const getCommentsByPostId = (req, res) => {
  const post_id = req.params.id;
  const query = `SELECT * FROM Comments WHERE post_id = '${post_id}'`
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All comments for post: ${post_id}`,
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
  createNewComment,
  getCommentsByPostId,
};


