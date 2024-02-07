const express = require("express");

require("dotenv").config();
const db = require("./models/db")
const app = express();
const PORT = process.env.PORT;


app.use(express.json());

app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
