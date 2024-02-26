const { pool } = require("../models/db");
// CREATE TABLE Messages (
//     MessageID SERIAL PRIMARY KEY,
//     SenderID INT NOT NULL,
//     RecipientID INT NOT NULL,
//     Content TEXT ,
//     created_at TIMESTAMP DEFAULT NOW(),
//     FOREIGN KEY (SenderID) REFERENCES Users(id),
//     FOREIGN KEY (RecipientID) REFERENCES Users(id)
// );
const createNewMessage = (req, res) => {
  const user_id = req.token.user_id;

  const { Content, send_for_id } = req.body;

  const query = `INSERT INTO Messages (
        SenderID,
        RecipientID,
        Content) VALUES
    ($1,$2,$3) RETURNING *`;

  const value = [user_id, send_for_id, Content];

  pool
    .query(query, value)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Successful send message",
        data: result.rows,
      });
      console.log(result);
    })
    .catch((err) => {
        res.status(500).json({
            success: false,
            message:err.message,
            data: err,
          });
    });
};


const getAllMessage = (req,res)=>{
    const user_id = req.token.user_id;
    // const send_for_id = req.params.id


    const query = `SELECT * FROM Messages WHERE SenderID = ${user_id} OR recipientid = ${user_id};`

    pool.query(query).then((result)=>{
        res.status(200).json({
            success: true,
            message: "All message",
            data: result.rows,
          });
    }).catch((err)=>{
        res.status(500).json({
            success: false,
            message:err.message,
            data: err,
          });
    })


}







module.exports = { createNewMessage,getAllMessage };
