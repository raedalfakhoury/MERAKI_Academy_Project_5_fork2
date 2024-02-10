const { pool } = require("../models/db");

const bcryptjs = require("bcryptjs");

const jwt = require("jsonwebtoken");

// role_id => users => 1
const role_id = 1;
// is deleted = 0 => is soft delete => => is_deleted = 1
const is_deleted = 0;

const SEC = process.env.SEC;

const register = async (req, res) => {
  const { username, email, password_hash, bio, profile_picture_url } = req.body;

  const salt = 5;
  const password = await bcryptjs.hash(password_hash, salt);
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

  pool
    .query(query, VALUES)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Account created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      if (err.code === "23505") {
        res.status(409).json({
          success: false,
          message: "The email or username already exists",
        });
        return;
      }
      console.log(err);
      res.status(500).json({
        message: err.message,
        err: err,
      });
    });
};
const login = (req, res) => {
  const { email, password } = req.body;

  const query = `SELECT Users.id,Users.username,Users.email,Users.password_hash,Users.bio, Users.profile_picture_url,Users.is_deleted,Users.created_at,roles.id AS RoleId FROM Users
  JOIN Roles ON Users.role_id=Roles.id 
    WHERE Users.email=$1`;

  pool
    .query(query,[email])
    .then((result) => {
      
      
      const data = result.rows[0];
      console.log(data);
      bcryptjs.compare(password, data.password_hash, (err, isValid) => {
        console.log(err);
        if (isValid) {
         
         const payload = {
            user_id: data.id,
            name: data.username,
            image: data.profile_picture_url,
            role: data.roleid,
            is_deleted: data.is_deleted,
          };
          // console.log(payload);

          const options = { expiresIn: "360m" };

          const token = jwt.sign(payload, SEC, options);
          res.status(200).json({
            success: true,
            massage: "Valid login credentials",
            token: token,
            userId: data.id,
          });
        } else {
          res.status(403).json({
            success: false,
            massage:
              "The email doesn’t exist or the password you’ve entered is incorrect",
          });
          return;
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(403).json({
        success: false,
        massage:
          "The email doesn’t exist or the password you’ve entered is incorrect",
      });
    });
};
const deleteUser = (req, res) => {
  const user_id = req.token.user_id;

  const querySoftDelete = ` UPDATE users
  SET is_deleted = 1
  WHERE id = ${user_id} RETURNING *`;

  pool
    .query(querySoftDelete)
    .then((result) => {
      console.log(result.rows);
      res.status(203).json({
        message: "Successful Deleted",
        result: result.rows,
      });
      if (result.rows.length === 0) {
        res.status(404).json({
          massage: "not exist",
          result: result.rows,
        });
        return;
      }
    })
    .catch((err) => {
      res.status(500).json({
        massage: "SERVER ERROR",
        err: err,
      });
    });
};

const updateUser = (req, res) => {
  const user_id = req.token.user_id;
  const { username, profile_picture_url, bio } = req.body;
  const query = `UPDATE Users SET username=COALESCE($1,username),profile_picture_url=COALESCE($2,profile_picture_url) ,bio=COALESCE($3,bio) WHERE id=$4 RETURNING *;`;
  const VALUES = [username, profile_picture_url, bio, user_id];

  pool
    .query(query, VALUES)
    .then((result) => {
      res.status(200).json({
        message: "Updated successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      if (err.code === "23505") {
        res.status(200).json({
          message: "username exists",
          err: err,
        });
        return;
      }
      res.status(500).json({
        message: err.message,
        err: err,
      });
    });
};

module.exports = { register, login, deleteUser, updateUser };
