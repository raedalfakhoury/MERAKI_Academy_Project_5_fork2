const { pool } = require("../models/db");

//  users Role Id =>
const userRoleId = 1;
//  admins Role Id =>
const adminRoleId = 2;

const createNewRole = (req, res) => {
  const { role } = req.body;

  const query = `INSERT INTO Roles(role) VALUES('${role}') RETURNING *`;

  pool
    .query(query)
    .then((role) => {
      res.status(201).json({
        success: true,
        massage: "Role created successfully",
        role: role.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    });
};
const createNewPermission = (req, res) => {
  const { permission } = req.body;
  const query = `INSERT INTO Permissions (permission) VALUES ('${permission}') RETURNING *`;
  pool
    .query(query)
    .then((permission) => {
      res.status(201).json({
        success: true,
        massage: "permission created successfully",
        permission: permission.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        massage: "Server error",
        err: err,
      });
    });
};
const createNewRolePermission = (req, res) => {
  const {role_id,permission_id} =req.body

  const query = `INSERT INTO role_permission (role_id,permission_id) VALUES ($1,$2) RETURNING *`
  const values = [role_id,permission_id] 
  pool.query(query, values).then((result)=>{
res.status(201).json({
  success:true,
  message:result.massage,
  result:result.rows
})
  }).catch((err)=>{
    res.status(500).json({
      success:false,
      message:result.massage,
      err:err
    })
  })






};

module.exports = {
  createNewRole,
  createNewPermission,
  createNewRolePermission,
};
