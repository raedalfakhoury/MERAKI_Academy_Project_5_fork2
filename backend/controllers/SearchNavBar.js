const { pool } = require("../models/db");


const search = async (req, res) => {
    const { searchString } = req.body;
  
    const query = `SELECT * FROM public.users WHERE username LIKE $1 AND username <> ''`;
  
    // Use the pool to execute the query
    
    pool.query(query, ['%' + searchString + '%'])

      .then((result) => {
        if (searchString===""){
          res.status(404).json({
            success: true,
            message: "Search successful",
            result: [],
          });
           return 
        }else {
          res.status(200).json({
            success: true,
            message: "Search successful",
            result: result.rows,
          });
        }
        
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({
          success: false,
          message: "An error occurred while processing your request",
          error: err.message,
        });
      });
  };
  

  module.exports = { search};
