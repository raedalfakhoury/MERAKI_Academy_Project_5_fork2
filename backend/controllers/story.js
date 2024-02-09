const { json } = require("express");
const { pool } = require("../models/db");

// user_id INT,
// media_url TEXT,
// video_url TEXT,

// INSERT INTO
//     Notifications (user_id, content)
// VALUES
//     (123, 'Someone liked your post.');

const addStory = (req, res) => {
  const user_id = req.token.user_id;
  const { video_url } = req.body;
  const query = `INSERT INTO Stories (user_id,video_url) VALUES ($1,$2) RETURNING *`;
  console.log();
  const values = [user_id, video_url];

  console.log(values);

  pool
    .query(query, values)
    .then((result) => {
      res.status(201).json({
        message: "created Successful Story",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Server error",
        err: err,
      });
    });
};
const removeStory = (req, res) => {
  const id = req.params.id;
  const user_id = req.token.user_id;
  const query = `DELETE FROM Stories WHERE user_id = ${user_id} AND id = ${id} RETURNING * `;
  pool
    .query(query)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          message: "not exist",
        });
        return;
      }
      res.status(203).json({
        message: "Successful deleted Story",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Server error",
        err: err,
      });
    });
};

const getAllStoryById = (req, res) => {
  const id_Use_Story = req.params.id;

  const query = `SELECT * FROM Stories WHERE user_id = ${id_Use_Story}`

  pool.query(query).then((result)=>{
    if (result.rows.length === 0) {
        res.status(404).json({
          message: "not exist",
          result:result.rows
        });
        return;
      }
      res.status(203).json({
        message: "Successful all story by user_id",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Server error",
        err: err,
      });
    });
};


module.exports = { addStory, removeStory, getAllStoryById };
