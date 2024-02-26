/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import "../AdminDashboard/Admin.css";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MailIcon from "@mui/icons-material/Mail";
import PeopleAltTwoToneIcon from "@mui/icons-material/PeopleAltTwoTone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setadminUsers } from "../redux/reducers/Admin";
import { setadminPosts } from "../redux/reducers/Admin/post";
import { setadminComments } from "../redux/reducers/Admin/comment";
const Admin = () => {
  const [toggleUser, setToggleUser] = useState(false);
  const [togglePost, setTogglePost] = useState(false);
  const [toggleComment, setToggleComment] = useState(false);
  const dispatch = useDispatch();
  const { users, token, posts, comments } = useSelector((state) => {
    return {
      users: state.adminUsers.adminUsers,
      token: state.auth.token,
      posts: state.adminPosts.adminPosts,
      comments: state.adminComments.adminComments,
    };
  });

  const [userCount, setUserCount] = useState();
  const [postCount, setPostCount] = useState();
  const [commentsCount, setCommentsCount] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/admin`)
      .then((result) => {
        setUserCount(result?.data?.length);
        dispatch(setadminUsers(result?.data?.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/post/1/getPosts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setPostCount(result?.data?.length);
        dispatch(setadminPosts(result?.data?.posts));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/comments/comments/admin`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => { 
        setCommentsCount(result?.data?.length);
        dispatch(setadminComments(result?.data?.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            // width: `calc(100% - ${drawerWidth}px)`,
            width: "100%",
            margin: "0px",
          }}
        >
          <Toolbar sx={{ justifyContent: "center", margin: "0px" }}>
            <Typography
              color="white"
              fontWeight="600"
              variant="h6"
              noWrap
              component="div"
            >
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar> 
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: "white",
            margin: "0px 100px",
            justifyContent: "flex-start",
            alignItems: "flex-start",
          }}
        >
          <Toolbar />
          
          <Typography paragraph>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                gap: "5%",
              }}
            >
              {/* users */}
              <div
                class="container1"
                onClick={() => {
                  setToggleUser(!toggleUser);
                  setTogglePost(false);
                }}
              >
                <div class="card_box">
                  <h1 style={{ margin: "0px" }}>
                    <PeopleAltTwoToneIcon />
                  </h1>
                  <h3>{userCount}</h3>
                  <span> </span>
                </div>
              </div>
              {/* Posts */}
              <div
                class="container2"
                onClick={() => {
                  setToggleUser(false);
                  setTogglePost(!togglePost);
                }}
              >
                <div class="card_box2">
                  <h1>
                    <MailIcon />
                  </h1>
                  {<h3>{postCount}</h3>}
                  <span></span>
                </div>
              </div>
              {/* Comments */}
              <div class="container3" onClick={() => {
                  setToggleUser(false);
                  setTogglePost(false);
                  setToggleComment(!toggleComment)
                }}>
                <div class="card_box3">
                  <h1>
                    {" "}
                    <ChatBubbleOutlineIcon />
                  </h1>
                  <h3>{commentsCount}</h3>
                  <span></span>
                </div>
              </div>
              {/* Likes */}
              <div class="container4">
                <div class="card_box4">
                  <ThumbUpIcon />
                  <span></span>
                </div>
              </div>
            </div>
          </Typography>
          <Typography paragraph>
            {toggleUser ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    borderBottom: "1px solid",
                    position: "sticky",
                    top: "0",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                      width: "130px",
                      textAlign: "center",
                    }}
                  >
                    profile Image
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                      width: "130px",
                      textAlign: "center",
                    }}
                  >
                    username
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                      width: "130px",
                      textAlign: "center",
                    }}
                  >
                    Bio
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                      width: "130px",
                      textAlign: "center",
                    }}
                  >
                    E-mail
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                      width: "130px",
                      textAlign: "center",
                    }}
                  >
                    Status account
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                      width: "130px",
                      textAlign: "center",
                    }}
                  >
                    Action
                  </p>
                </div>
                {users?.map((ele) => {
                  console.log(ele);
                  return (
                    <div
                      key={ele.id}
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #ff9b9b",
                        alignItems: "center",
                      }}
                    >
                      <img
                        alt=""
                        src={ele.profile_picture_url}
                        style={{
                          height: "130px",
                          width: "130px",
                          borderRadius: "50%",
                          margin: "5px 0px",
                          padding: "2px",
                          border: "1px solid grey",
                        }}
                      ></img>
                      <p style={{ width: "130px", textAlign: "center" }}>
                        {ele.username}
                      </p>
                      <p style={{ width: "130px", textAlign: "center" }}>
                        {ele.bio}
                      </p>
                      <p
                        style={{ width: "130px", textAlign: "center" }}
                        title={ele.email}
                      >
                        {ele.email.length > 13 ? (
                          <span>{ele.email.slice(0, 14)}...</span>
                        ) : (
                          ele.email
                        )}
                      </p>
                      <p
                        style={{
                          width: "130px",
                          color: "green",
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        Active
                      </p>
                      <button class="btn12" type="button">
                        <strong>Block</strong>
                        <div id="container-stars">
                          <div id="stars"></div>
                        </div>

                        <div id="glow">
                          <div class="circle"></div>
                          <div class="circle"></div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}

            {/* -------------------------Posts------------------------------------------------------ */}

            {togglePost ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    borderBottom: "1px solid",
                    position: "sticky",
                    top: "0px",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                      width: "130px",
                      textAlign: "center",
                    }}
                  >
                    Post Image
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                      width: "130px",
                      textAlign: "center",
                    }}
                  >
                    Owner
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                      width: "130px",
                      textAlign: "center",
                    }}
                  >
                    Content
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                      width: "130px",
                      textAlign: "center",
                    }}
                  >
                    created_at
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                      width: "130px",
                      textAlign: "center",
                    }}
                  >
                    Status post
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                      width: "130px",
                      textAlign: "center",
                    }}
                  >
                    Action
                  </p>
                </div>
                {posts?.map((ele) => {
                  console.log(ele);
                  return (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #ff9b9b",
                        alignItems: "center",
                      }}
                    >
                      {ele.media_url.includes(".mp4") ? (
                        <video
                          style={{
                            cursor: "pointer",
                            height: "100px",
                            width: "130px",
                          }}
                          controls
                          muted
                          className="img-post"
                          src={ele.media_url}
                          onClick={() => {
                            console.log(ele.id);
                          }}
                        ></video>
                      ) : (
                        <img
                          alt=""
                          src={ele.media_url}
                          style={{
                            height: "100px",
                            width: "130px",
                            borderRadius: "5px",
                            margin: "5px 0px",
                            padding: "2px",
                            boxShadow: "#5c62685c 3px 3px 3px",
                          }}
                        ></img>
                      )}
                      <p style={{ width: "130px", textAlign: "center" }}>
                        {ele.username}
                      </p>
                      <p
                        style={{ width: "130px", textAlign: "center" }}
                        title={ele.content}
                      >
                        {ele.content.length > 13 ? (
                          <span>{ele.content.slice(0, 13)}</span>
                        ) : ele.content.length === 0 ? (
                          <p style={{ color: "red" }}>No Content</p>
                        ) : (
                          ele.content
                        )}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <p
                          style={{ width: "130px", textAlign: "center" }}
                          title={ele.created_at}
                        >
                          {ele.created_at.length > 13 ? (
                            <span>{ele.created_at.slice(0, 10)}</span>
                          ) : (
                            ele.created_at
                          )}
                        </p>

                        <p
                          style={{ width: "130px", textAlign: "center" }}
                          title={ele.created_at}
                        >
                          {ele.created_at.length > 13 ? (
                            <span>
                              {ele.created_at.slice(
                                11,
                                ele.created_at.length - 5
                              )}
                            </span>
                          ) : (
                            ele.created_at
                          )}
                        </p>
                      </div>
                      <p
                        style={{
                          width: "130px",
                          color: "green",
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        Accept
                      </p>
                      <button class="btn12" type="button">
                        <strong>Block</strong>
                        <div id="container-stars">
                          <div id="stars"></div>
                        </div>

                        <div id="glow">
                          <div class="circle"></div>
                          <div class="circle"></div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}

  {/* -------------------------Comments------------------------------------------------------ */}
  {toggleComment ? (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "space-between",
                    borderBottom: "1px solid",
                    position: "sticky",
                    top: "0px",
                  }}
                >
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                      width: "130px",
                      textAlign: "center",
                    }}
                  >
                    Post Image
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                      width: "130px",
                      textAlign: "center",
                    }}
                  >
                    Commenter
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                      width: "130px",
                      textAlign: "center",
                    }}
                  >
                    Comments
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                      width: "130px",
                      textAlign: "center",
                    }}
                  >
                    created_at
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                      width: "130px",
                      textAlign: "center",
                    }}
                  >
                    Status Comment
                  </p>
                  <p
                    style={{
                      fontWeight: "600",
                      fontSize: "18px",
                      margin: "0px 0px 5px 0px",
                      width: "130px",
                      textAlign: "center",
                    }}
                  >
                    Action
                  </p>
                </div>
                {comments?.map((ele) => {
                  console.log(ele);
                  return (
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        borderBottom: "1px solid #ff9b9b",
                        alignItems: "center",
                      }}
                    >
                      {ele.media_url.includes(".mp4") ? (
                        <video
                          style={{
                            cursor: "pointer",
                            height: "100px",
                            width: "130px",
                          }}
                          controls
                          muted
                          className="img-post"
                          src={ele.media_url}
                          onClick={() => {
                            console.log(ele.id);
                          }}
                        ></video>
                      ) : (
                        <img
                          alt=""
                          src={ele.media_url}
                          style={{
                            height: "100px",
                            width: "130px",
                            borderRadius: "5px",
                            margin: "5px 0px",
                            padding: "2px",
                            boxShadow: "#5c62685c 3px 3px 3px",
                          }}
                        ></img>
                      )}
                      <p style={{ width: "130px", textAlign: "center" }}>
                        {ele.username}
                      </p>
                      <p
                        style={{ width: "130px", textAlign: "center" }}
                        title={ele.content}
                      >
                        {ele.content.length > 13 ? (
                          <span>{ele.content.slice(0, 13)}</span>
                        ) : ele.content.length === 0 ? (
                          <p style={{ color: "red" }}>No Content</p>
                        ) : (
                          ele.content
                        )}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <p
                          style={{ width: "130px", textAlign: "center" }}
                          title={ele.created_at}
                        >
                          {ele.created_at.length > 13 ? (
                            <span>{ele.created_at.slice(0, 10)}</span>
                          ) : (
                            ele.created_at
                          )}
                        </p>

                        <p
                          style={{ width: "130px", textAlign: "center" }}
                          title={ele.created_at}
                        >
                          {ele.created_at.length > 13 ? (
                            <span>
                              {ele.created_at.slice(
                                11,
                                ele.created_at.length - 5
                              )}
                            </span>
                          ) : (
                            ele.created_at
                          )}
                        </p>
                      </div>
                      <p
                        style={{
                          width: "130px",
                          color: "green",
                          fontWeight: "600",
                          textAlign: "center",
                        }}
                      >
                        Accept
                      </p>
                      <button class="btn12" type="button">
                        <strong>Block</strong>
                        <div id="container-stars">
                          <div id="stars"></div>
                        </div>

                        <div id="glow">
                          <div class="circle"></div>
                          <div class="circle"></div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              ""
            )}
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default Admin;
