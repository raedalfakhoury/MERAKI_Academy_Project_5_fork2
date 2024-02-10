const { pool } = require("../models/db");

const createNewReels = (req, res) => {

    const { description, video_url } = req.body
    const user_id = req.token.user_id;
    const query = `INSERT INTO Reels (user_id, description, video_url ) 
    VALUES ($1, $2, $3) 
    RETURNING id, user_id, description, video_url, creation_date`
        ;
    const data = [user_id, description, video_url];

    pool
        .query(query, data)
        .then((result) => {
            res.status(201).json({
                success: true,
                message: "Reel created successfully ",
                result: result.rows[0],
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "server error",
                result: err.message,
            })

        })

};



const deleteReels = (req, res) => {

    const Reels_id = req.params.id;
    const query = `UPDATE Reels SET is_deleted = 1 WHERE id=${Reels_id} RETURNING *`;

    pool
        .query(query)
        .then((result) => {
            res.status(200).json({
                success: true,
                message: "All reels deleted successfully",
                result: result.rows,
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "Server error",
                result: err.message,
            });
        });
};

const getReelsByUser = (req, res) => {
    const id = req.params.id
    const query = `SELECT * FROM Reels WHERE user_id = ${id} AND is_deleted=0`
    pool.query(query).then((result) => {
        if (result.rows.length === 0) {
            res.status(404).json({
                message: "reels not exist",
                result: result.rows
            })
            return
        }
        res.status(200).json({
            message: "Succesful reels by user",
            result: result.rows
        })
    }).catch((err) => {
        res.status(500).json({
            success: false,
            message: "Server error",
            result: err.message,
        });
    })
}










module.exports = { createNewReels, deleteReels, getReelsByUser }