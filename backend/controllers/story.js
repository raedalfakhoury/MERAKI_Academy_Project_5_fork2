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
   
};

module.exports = { addStory, removeStory };
