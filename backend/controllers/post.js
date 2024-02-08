const {pool} =require ("../models/db")


const createNewPost = (req, res) => {
    const { user_id, content, media_url } = req.body;
    const query = `
          INSERT INTO Posts (user_id, content, media_url)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;
    const data = [user_id, content, media_url];

    pool
        .query(query, data)
        .then((result) => {
            res.status(201).json({
                success: true,
                message: "Post created successfully",
                result: result.rows[0],
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Server error",
                err: err.message,
            });
        });
};






module.exports = {createNewPost,}





// CREATE TABLE Posts (
//     id SERIAL PRIMARY KEY,
//     user_id INT,
//     content TEXT NOT NULL,
//     media_url TEXT,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     is_deleted INT,
//     FOREIGN KEY (user_id) REFERENCES Users (id)
// );









