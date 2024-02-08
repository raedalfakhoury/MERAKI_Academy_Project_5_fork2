const { Pool } = require("pg");

const connectionString = process.env.URL;
console.log("pool=>"+connectionString);
const pool = new Pool({
  connectionString,
});

pool.connect((err, pool) => {
  if (err) {
    console.log("err", err);
    console.error("client didn't connect", err.message, err.stack);
    return;
  }

  console.log("pool connected on " + pool.user);
});
const CreateTable = () => {
  pool
    .query(
      `CREATE TABLE Users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(100) NOT NULL,
        bio TEXT,
        profile_picture_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        role_id INT,
        is_deleted INT,
        FOREIGN KEY (role_id) REFERENCES Roles (id)
    )`
    )
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = { pool };


// CreateTable();