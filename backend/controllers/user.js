const { pool } = require("../models/db");
const bcrypt = require("bcrypt")
// role_id => users => 1
const role_id = 1;
// is deleted = 0 => is soft delete => => is_deleted = 1
const is_deleted = 0;
const register = async(req, res) => {
  const { username, email, password_hash, bio, profile_picture_url } = req.body;

  const salt = 5;
  const password = await bcrypt.hash(password_hash, salt);
  const Email = email.toLowerCase();
  console.log(Email);
  console.log(password);



  const VALUES = [
    username,
    Email,
    password,
    bio,
    profile_picture_url,
    role_id,
    is_deleted,
  ]; // 7 elm

  const query = `INSERT INTO Users (
            username,
            email,
            password_hash,
            bio,
            profile_picture_url,
            role_id,
            is_deleted) VALUES
        ($1,$2,$3,$4,$5,$6,$7) RETURNING *`;

        pool.query(query,VALUES).then((result)=>{
            res.status(201).json({
                success: true,
                message: "Account created successfully",
                result: result.rows,
              });
        }).catch((err)=>{
            if (err.code === "23505") {
                res.status(409).json({
                  success: false,
                  message: "The email already exists",
                });
                return;
              }
              console.log(err);
              res.status(500).json({
                message: err.message,
                err: err,
              });
        })



};
const login = (req, res) => {};
const deleteUser = (req, res) => {};
const updateUser = (req, res) => {};

module.exports = { register, login, deleteUser, updateUser };
