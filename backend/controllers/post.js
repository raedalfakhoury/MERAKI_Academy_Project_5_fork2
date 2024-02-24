const { pool } = require("../models/db");

const createNewPost = (req, res) => {
  const { content, media_url } = req.body;
  const user_id = req.token.user_id;
  const query = `
          INSERT INTO Posts (user_id, content, media_url)
          VALUES ($1, $2, $3)
          RETURNING *;
        `;
  const data = [user_id, content, media_url];

  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Post created successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

const getPostById = (req, res) => {
  const post_id = req.params.postbyid;

  const query = `
      SELECT * FROM Posts
      WHERE id = $1 AND is_deleted = 0;
  `;

  const data = [post_id];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length > 0) {
        res.status(200).json({
          success: true,
          message: `Post with ID ${post_id} retrieved successfully`,
          post: result.rows,
        });
      } else {
        res.status(404).json({
          success: false,
          message: `Post with ID ${post_id} not found`,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

const getpostByuserId = (req, res) => {
  const userId = req.params.userId;

  const query = `
          SELECT Posts.id,
          Posts.user_id,
          Posts.content,
          Posts.media_url,
          Posts.created_at,
          Users.profile_picture_url,
          Users.username FROM 
          Posts
          JOIN Users ON Posts.user_id = Users.id 
          WHERE Posts.user_id=$1 AND Posts.is_deleted=0 AND Users.is_deleted=0;
        `;

  const data = [userId];

  pool
    .query(query, data)
    .then((result) => {
      if (result.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: `The user: ${userId} has no posts`,
        });
      } else {
        res.status(200).json({
          success: true,
          message: `All Posts for the user: ${userId}`,
          result: result.rows,
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

const updatepostById = (req, res) => {
  const { id } = req.params;
  const { content, media_url } = req.body;
  const query = `UPDATE Posts
  SET content = $1 , media_url=$2
 
  WHERE id = $3 RETURNING *;`;

  const values = [content, media_url, id];
  pool
    .query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        result: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(409).json({
        success: false,
        err,
      });
    });
};

const deletePostByUserId = (req, res) => {
  const id = req.token.user_id;
  const query = `UPDATE Posts SET is_deleted=1 WHERE user_id=$1 ;`;

  const values = [id];
  pool
    .query(query, values)
    .then((result) => {
      res.status(200).json({
        success: true,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        err,
      });
    });
};

const getAllPosts = (req, res) => {
  const query = `SELECT * FROM Posts JOIN Users 
      ON posts.user_id = Users.id  
      WHERE posts.is_deleted = 0 AND Users.is_deleted = 0 ;`;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All posts retrieved successfully",
        posts: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

const deletePostById = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE Posts SET is_deleted=1 WHERE id= ${id} RETURNING *;`;

  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        err: err,
      });
    });
};

/*SELECT 
    Posts.id,
    Posts.content,
    Posts.media_url,
    Users.profile_picture_url,
    (
        SELECT COUNT(*) 
        FROM Comments 
        WHERE Comments.post_id = Posts.id
    ) AS comment_count,
    ARRAY (
        SELECT json_build_object(
            'comment_content', Comments.content,
            'commenter_profile_picture', Users.profile_picture_url
        )
        FROM Comments 
        INNER JOIN Users ON Comments.user_id = Users.id
        WHERE Comments.post_id = Posts.id
    ) AS comments
FROM 
    Posts
INNER JOIN Users ON Posts.user_id = Users.id
WHERE 
    Posts.is_deleted = 0;
*/

// كل المنشورات للاشخاص الذي اتابعهم مع منشوراتي
const getAllPostsMyFriends = (req, res) => {
  const user_id = req.token.user_id;
  const query = `SELECT 
  Posts.id,
  Posts.user_id,
  Posts.content,
  Posts.media_url,
  Posts.created_at,
  Users.profile_picture_url,
  Users.username,
  (
      SELECT COUNT(*) 
      FROM Comments 
      WHERE Comments.post_id = Posts.id
  ) AS comment_count,
  (
      SELECT COUNT(*) 
      FROM Likes 
      WHERE Likes.post_id = Posts.id
  ) AS Like_count,
  ARRAY (
      SELECT json_build_object(
          'comment_content', Comments.content,
          'commenter_profile_picture', Users.profile_picture_url,
          'commenter_name', Users.username
      )
      FROM Comments 
      INNER JOIN Users ON Comments.user_id = Users.id
      WHERE Comments.post_id = Posts.id
      LIMIT 4
  ) AS comments
FROM 
  Posts
INNER JOIN Users ON Posts.user_id = Users.id  
WHERE 
  Posts.is_deleted = 0
  AND
  Posts.user_id IN (SELECT followed_id FROM Follows WHERE follower_id =${user_id}) OR Posts.user_id = ${user_id}  AND Posts.is_deleted = 0  ORDER BY  Posts.created_at DESC`;
  //  SELECT Posts.* , Users.username ,Users.profile_picture_url
  //   FROM Posts
  //   JOIN Follows ON Posts.user_id = Follows.followed_id
  //   JOIN Users ON Posts.user_id = Users.id
  //   WHERE Follows.follower_id =${user_id} AND Posts.is_deleted = 0
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All followed",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        err: err,
      });
    });
};

const countFAndDAndPo = (req, res) => {
  const IdPorFileUser = req.params.id;
  const query = `
  
  SELECT 'followers' AS relationship_type,COUNT( DISTINCT  Follows.follower_id ) AS count
FROM Follows
WHERE Follows.followed_id =${IdPorFileUser} AND Follows.follower_id  !=${IdPorFileUser}

UNION ALL

SELECT  'following' AS relationship_type,COUNT( DISTINCT  Follows.followed_id ) AS count
FROM Follows 
WHERE Follows.follower_id = ${IdPorFileUser} AND Follows.followed_id  !=${IdPorFileUser}

UNION ALL

SELECT 'Posts' AS relationship_type, COUNT(*) AS count
FROM Posts
WHERE Posts.user_id =112 AND Posts.is_deleted =0;
  `;
  pool
    .query(query)
    .then((result) => {
      res.status(200).json({
        successful: true,
        message: "All Count Posts And Count follower Count followed ",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        err: err,
      });
    });
};

const savePost = (req, res) => {
  const user_id = req.token.user_id;
  const { post_id } = req.body;
  const data = [user_id, post_id];
  const query = `INSERT INTO Posts_Users (user_id , post_id) VALUES ($1 , $2) RETURNING * ; `;
  pool
    .query(query, data)
    .then((result) => {
      res.status(202).json({
        successful: true,
        message: "All Saved Posts",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        err: err,
      });
    });
};

const getSavedPosts = (req, res) => {
  const user_id = req.token.user_id;
  const value = [user_id];
  const query = `SELECT DISTINCT 
  Posts_Users.user_id,
  Posts_Users.post_id,
  Users.username,
 Posts.media_url,
  Posts.content
FROM
  Posts_Users
JOIN
  Users ON Posts_Users.user_id = Users.id
JOIN
  Posts ON Posts_Users.post_id = Posts.id
  WHERE Posts_Users.user_id = $1
  ;`;
  pool
    .query(query, value)
    .then((result) => {
      res.status(200).json({
        successful: true,
        message: "get All Saved Posts",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        err: err,
      });
    });
};

const deleteSavePost = (req, res) => {
  const user_id = req.token.user_id;
  const { post_id } = req.body;
  const data = [user_id, post_id];
  const query = ` DELETE FROM Posts_Users WHERE Posts_Users.user_id = $1 AND Posts_Users.post_id = $2  ;`;
  pool
    .query(query, data)
    .then((result) => {
      res.status(200).json({
        successful: true,
        message: "deleted successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        err: err,
      });
    });
};

const getPostAndComment = (req, res) => {
  const { Posts_id } = req.params;
  const data = [Posts_id];
  const query = `SELECT Comments.comment_id ,
  Comments.post_id,Comments.user_id,
   Comments.created_at,
   Comments.content AS COMMENT_CONTENT,
   Users.username , 
    Users.profile_picture_url ,
    Posts.media_url  
     FROM Comments
      JOIN Users ON Users.id = Comments.user_id 
      JOIN Posts ON Posts.id = Comments.post_id
      WHERE post_id = $1 AND Posts.is_deleted=0;
;
`;
  pool
    .query(query,data)
    .then((result) => {
      res.status(200).json({
        successful: true,
        message: "get Posts with comments",
        result: result.rows,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        success: false,
        err: err,
      });
    });
};
module.exports = {
  createNewPost,
  countFAndDAndPo,
  getPostById,
  getpostByuserId,
  updatepostById,
  deletePostByUserId,

  getAllPosts,
  deletePostById,
  getAllPostsMyFriends,
  savePost,
  getSavedPosts,
  deleteSavePost,
  getPostAndComment,
};

// CREATE TABLE Posts (
//     id SERIAL PRIMARY KEY,
//     user_id INT,
//     content TEXT NOT NULL,
//     media_url TEXT,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     is_deleted INT,
//     FOREIGN KEY (user_id) REFERENCES Users (id)
// );
