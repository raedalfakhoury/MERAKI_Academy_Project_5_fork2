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
      `CREATE TABLE Roles (
        id SERIAL NOT NULL,
        role VARCHAR(255) NOT NULL,
        PRIMARY KEY (id)
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