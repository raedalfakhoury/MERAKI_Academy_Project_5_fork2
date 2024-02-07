const { Pool } = require("pg");

const connectionString = process.env.URL;

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
